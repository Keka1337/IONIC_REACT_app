import { Appointment } from '../appointments/appointments.model';

export class Reservation {
  constructor(
    public id: string | null,
    public userId: string,
    public appointment: Appointment
  ) {}
}
