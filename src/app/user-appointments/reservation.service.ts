import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Appointment } from '../appointments/appointments.model';
import { AuthService } from '../auth/auth.service';
import { Reservation } from './reservation';

interface ReservationData {
  userId: string;
  appointment: Appointment;
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private _reservations = new BehaviorSubject<Reservation[]>([]);
  private _allReservations = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get reservations() {
    return this._reservations.asObservable();
  }

  get allReservations() {
    return this._allReservations.asObservable();
  }

  getReservations(userId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ReservationData }>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/reservations.json?auth=${token}`
        );
      }),
      map((reservationData: any) => {
        const rezervacije: Reservation[] = [];
        for (const key in reservationData) {
          if (
            reservationData.hasOwnProperty(key) &&
            reservationData[key].userId === userId
          ) {
            rezervacije.push(
              new Reservation(
                key,
                reservationData[key].userId,
                reservationData[key].appointment
              )
            );
          }
        }
        return rezervacije;
      }),
      tap((reservations) => {
        this._reservations.next(reservations);
      })
    );
  }

  makeReservation(appointment: Appointment) {
    let generatedId: string;
    let newReservation: Reservation;
    const userId = this.authService.currentUser.email;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        newReservation = new Reservation(null, userId, appointment);
        return this.http.post<{ name: string }>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/reservations.json?auth=${token}`,
          newReservation
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.reservations;
      }),
      take(1),
      tap((reservations) => {
        newReservation.id = generatedId;
        this._reservations.next(reservations.concat(newReservation));
      })
    );
  }
}
