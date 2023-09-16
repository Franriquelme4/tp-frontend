import { Component } from '@angular/core';
import { Persona, Filtro } from 'src/app/interfaces/administracion.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { ReservaTurnosService } from '../../../services/reserva-turnos.service';
import { ReservaTurno } from 'src/app/interfaces/reserva-turno.interface';

@Component({
  selector: 'app-reserva-turnos-page',
  templateUrl: './reserva-turnos-page.component.html',
  styleUrls: ['./reserva-turnos-page.component.css']
})
export class ReservaTurnosPageComponent {
  reservas:ReservaTurno[] = [];
  filtros:Filtro = {
    nombre: '',
    apellido: '',
    tipo: 'todo',
  };

  ngOnInit(): void {
    this.reservas = this.reservaTurnoSrv.obtenerReservaTurnos();
    console.log(this.reservas,'reservas');

    // console.log(this.personas,'personas');
  }

  constructor(
    private service:AdministracionPacientesDoctoresService,
    private reservaTurnoSrv:ReservaTurnosService
  ) { }

  cancelarTurno(id:string){
    // this.service.eliminarPersona(id);
    // this.personas = this.service.personas;
  }

  filtrar(){
    // this.personas = this.service.getPersonasFiltro(this.filtros);
  }
}
