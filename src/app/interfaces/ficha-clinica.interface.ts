import { Persona } from "./administracion.interface";
import { Categoria } from "./categoria.interface";

export interface FichaClinica {
    id: string,
    paciente: Persona,
    doctor: Persona,
    fecha: string,
    diagnostico: string,
    categoria: Categoria
}