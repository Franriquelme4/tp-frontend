import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReservaTurno } from '../interfaces/reserva-turno.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservaTurnosService {
  setTurnoNuevo(valueRequest: ReservaTurno) {
    throw new Error('Method not implemented.');
  }
  private reservaTurnosSubject = new BehaviorSubject<ReservaTurno[]>([]);

  constructor() { }

  guardarReservaTurnos(reservaTurnos: ReservaTurno[]){
    sessionStorage.setItem('ReservaTurnos', JSON.stringify(reservaTurnos));
  }

  obtenerReservaTurnos(): ReservaTurno[]{
    const reservaTurnos = sessionStorage.getItem('ReservaTurnos') as string;
    const reservaTurnosObj = JSON.parse(reservaTurnos ?? '[]') as ReservaTurno[];
    return reservaTurnosObj;
  }

  get reservaTurnos$(): Observable<ReservaTurno[]>{
    return this.reservaTurnosSubject.asObservable();
  }

  cargarReservaTurnos(): void{
    const ReservaTurnos = this.obtenerReservaTurnos();
    this.reservaTurnosSubject.next(ReservaTurnos);
  }

  setReservaTurnoNueva(nuevaReservaTurno: ReservaTurno): void{
    nuevaReservaTurno = {
      ...nuevaReservaTurno,
      estado: 'pendiente',
    }
    const reservaTurnos = this.obtenerReservaTurnos();
    this.reservaTurnosSubject.next([nuevaReservaTurno, ...reservaTurnos]);
    this.guardarReservaTurnos(this.reservaTurnosSubject.value);
  }

  set ReservaTurnos(reservaTurnos: ReservaTurno[]){
    this.guardarReservaTurnos(reservaTurnos);
  }

  encontrarReservaTurnoPorId(id: string): ReservaTurno | undefined{
    const reservaTurnos = this.obtenerReservaTurnos();
    const reservaTurno = reservaTurnos.find(cat => cat.id === id);
    return reservaTurno;
  }
}
