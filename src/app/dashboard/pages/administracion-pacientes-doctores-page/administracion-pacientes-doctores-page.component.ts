import { Component, OnInit } from '@angular/core';
import { AdministracionPacientesDoctoresService } from '../../../services/administracion-pacientes-doctores.service';
import { Filtro, Persona } from 'src/app/interfaces/administracion.interface';

@Component({
  selector: 'app-administracion-pacientes-doctores-page',
  templateUrl: './administracion-pacientes-doctores-page.component.html',
  styleUrls: ['./administracion-pacientes-doctores-page.component.css']
})
export class AdministracionPacientesDoctoresPageComponent implements OnInit {
  personas:Persona[] = [];
  filtros:Filtro = {
    nombre: '',
    apellido: '',
    tipo: 'todo',
  };

  ngOnInit(): void {
    this.personas = this.service.getPersonasFiltro(this.filtros);
    console.log(this.personas,'personas');
  }

  constructor(
    private service:AdministracionPacientesDoctoresService
  ) { }

  eliminarPersona(id:string){
    this.service.eliminarPersona(id);
    this.personas = this.service.personas;
  }

  filtrar(){
    this.personas = this.service.getPersonasFiltro(this.filtros);
  }

}
