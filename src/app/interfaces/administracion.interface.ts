export interface Persona {
    id: string,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    cedula: string,
    esDoctor: boolean,
}

export interface Filtro {
    nombre: string,
    apellido: string,
    tipo: string,
}
