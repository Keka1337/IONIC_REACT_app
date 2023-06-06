import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Appointment } from './appointments.model';

interface AppointmentsData {
  date: Date;
  free: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private _appointments = new BehaviorSubject<Appointment[]>([]);
  appointment!: Appointment;
  constructor(private http: HttpClient, private authService: AuthService) {}

  get appointments() {
    return this._appointments.asObservable;
  }

  addAppointment(date: Date, free: boolean = true) {
    let generatedId: string;

    this.appointment = new Appointment('', date, free);
    return this.http
      .post<{ name: string }>(
        `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/appointments.json`,
        { date, free }
      )
      .pipe(
        //presrecemo odgovor
        switchMap((resData) => {
          //switchMap vraca Observable
          generatedId = resData.name;
          return this._appointments;
        }),
        take(1), //uzimamo poslednji emit appointments-a
        tap((appointments) => {
          //pristupamo vrednosti tog poslednjeg emita/objekta
          this._appointments.next(
            appointments.concat(
              //pozivamo next metodu kako bi se okinule promene u ngOnInit
              {
                id: generatedId,
                date,
                free,
              }
            )
          );
          return this._appointments;
        })
      );
  }

  getAppointments() {
    return this.http
      .get<{ [key: string]: AppointmentsData }>(
        `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/appointments.json`
      )
      .pipe(
        map((appointmentsData) => {
          const appointments: Appointment[] = [];

          for (const key in appointmentsData) {
            if (appointmentsData.hasOwnProperty(key)) {
              appointments.push({
                id: key,
                date: appointmentsData[key].date,
                free: appointmentsData[key].free,
              });
            }
          }
          return appointments;
        }),
        tap((appointments) => {
          this._appointments.next(appointments);
        })
      );
  }

  deleteAppointment(id: string) {
    this.http.delete(
      `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/appointments/${id}`
    );
  }

  editAppointment(id: string, date: Date, free: boolean) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.put(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/appointments/${id}.json?auth=${token}`,
          {
            date,
            free,
          }
        )
      ),
      switchMap(() => this._appointments),
      take(1),
      tap((appointments) => {
        const index = appointments.findIndex((p) => p.id === id);
        const updated = [...appointments];
        updated[index] = new Appointment(id, date, free);
        this._appointments.next(updated);
      })
    );
  }
}
