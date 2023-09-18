import { Persona } from "./administracion.interface";

export interface FichaClinica {
    id: string,
    paciente: Persona,
    doctor: Persona,
    fecha: string,
    diagnostico: string,
}