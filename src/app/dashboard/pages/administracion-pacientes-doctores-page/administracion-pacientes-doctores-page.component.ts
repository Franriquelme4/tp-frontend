import { Component, OnInit } from '@angular/core';
import { AdministracionPacientesDoctoresService } from '../../../services/administracion-pacientes-doctores.service';
import { Persona } from 'src/app/interfaces/administracion.interface';

@Component({
  selector: 'app-administracion-pacientes-doctores-page',
  templateUrl: './administracion-pacientes-doctores-page.component.html',
  styleUrls: ['./administracion-pacientes-doctores-page.component.css']
})
export class AdministracionPacientesDoctoresPageComponent implements OnInit {
  personas:Persona[] = [];

  ngOnInit(): void {
    this.personas = this.service.personas;
    console.log(this.personas,'personas');

  }

  constructor(
    private service:AdministracionPacientesDoctoresService
  ) { }

  eliminarPersona(id:string){
    this.service.eliminarPersona(id);
    this.personas = this.service.personas;
  }

}
