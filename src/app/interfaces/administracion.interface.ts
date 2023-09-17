export interface Persona {
    id: string,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    cedula: string,
    esDoctor: boolean,
}

export interface FiltroPersona {
    nombre: string,
    apellido: string,
    tipo: string,
}
