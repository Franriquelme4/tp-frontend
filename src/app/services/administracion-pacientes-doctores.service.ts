import { Injectable } from '@angular/core';
import { FiltroPersona, Persona } from '../interfaces/administracion.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministracionPacientesDoctoresService {

  constructor() { }

  get personas(): Persona[]{
    const personas = sessionStorage.getItem('personas') as string;
    const personasObj = JSON.parse(personas ?? '[]') as Persona[];
    return personasObj;
  }

  setPersonaNueva(nuevaPersona: Persona): void{
    const personas = sessionStorage.getItem('personas') as string;
    const personasObj = JSON.parse(personas ?? '[]') as Persona[];
    personasObj.push(nuevaPersona)
    sessionStorage.setItem('personas', JSON.stringify(personasObj));
  }

  set personas(personas: Persona[]){
    sessionStorage.setItem('personas', JSON.stringify(personas));
  }

  encontrarPersonaPorId(id: string): Persona | undefined{
    const personas = sessionStorage.getItem('personas') as string;
    const personasObj = JSON.parse(personas ?? '[]') as Persona[];
    const persona = personasObj.find(cat => cat.id === id);
    return persona;
  }

  eliminarPersona(idPersona: string) {
    console.log(idPersona);
    let personas:Persona[] = this.personas;
    personas = personas.filter((persona: any) => persona.id!== idPersona);
    this.personas = personas;
    console.log(this.personas);
  }

  editarPersona(persona: Persona) {
    const personas = this.personas;
    console.log(personas,persona);
    const index = personas.findIndex(p => p.id === persona.id);
    console.log(index);
    if (index !== -1) {
      console.log('index', index);
      // Actualiza la persona en el array de personas
      personas[index] = persona;
      // Actualiza el sessionStorage con el array actualizado
      this.personas = personas;
    }
  }

  getPersonasFiltro(filtro:FiltroPersona | any){
    let personas = this.personas;
    if(filtro.nombre){
      personas = personas.filter((persona: any) => persona.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()));
    }
    if(filtro.apellido){
      personas = personas.filter((persona: any) => persona.apellido.toLowerCase().includes(filtro.apellido.toLowerCase()));
    }
    if(filtro.tipo !== 'todo'){
      if(filtro.tipo === 'paciente'){
        personas = personas.filter((persona: any) => persona.esDoctor === false);
      }else{
        personas = personas.filter((persona: any) => persona.esDoctor === true);
      }
    }
    return personas;
  }
}

export class AdministracionCategoriaService {
}
