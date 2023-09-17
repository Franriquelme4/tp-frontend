import { Persona } from "./administracion.interface";


export interface Turno{
  id: number,
  inicio: string,
  fin: string,
}
export interface ReservaTurno{
    id: string,
    paciente: Persona,
    doctor: Persona,
    fecha: string,
    turno: Turno,
    estado:string
}

export interface FiltroReserva {
    doctorId: string,
    pacienteId: string,
    fechaDesde:string,
    fechaHasta:string
}
