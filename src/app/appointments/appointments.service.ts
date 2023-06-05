import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Appointment } from './appointments.model';

interface AppointmentsData {
  date: Date;
  free: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private _appointments: Appointment[] = [];
  appointment!: Appointment;
  constructor(private http: HttpClient) {}

  get appointments(): Appointment[] {
    return this._appointments;
  }

  addAppointment(date: Date, free: boolean = false) {
    this.appointment = new Appointment('', date, free);
    return this.http.post<{ name: string }>(
      `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/appointments.json`,
      { date, free }
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
          this._appointments = appointments;
          return appointments;
        })
      );
  }

  deleteAppointment(id: string) {}
}
