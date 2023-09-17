import { Component } from '@angular/core';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { ReservaTurnosService } from '../../../services/reserva-turnos.service';
import { ReservaTurno } from 'src/app/interfaces/reserva-turno.interface';
import { FiltroReserva } from '../../../interfaces/reserva-turno.interface';

@Component({
  selector: 'app-reserva-turnos-page',
  templateUrl: './reserva-turnos-page.component.html',
  styleUrls: ['./reserva-turnos-page.component.css']
})
export class ReservaTurnosPageComponent {
  pacientes: Persona[] = [];
  doctores: Persona[] = [];
  reservas: ReservaTurno[] = [];
  filtros: FiltroReserva = {
    doctorId: '',
    pacienteId: '',
    fechaDesde: '',
    fechaHasta: ''
  }

  ngOnInit(): void {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque los meses comienzan desde 0
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.filtros.fechaDesde = fechaFormateada;
    this.filtros.fechaHasta = fechaFormateada;
    this.reservas = this.reservaTurnoSrv.getReservaTurnosFiltro(this.filtros);
    this.pacientes = this.service.getPersonasFiltro({ tipo: 'paciente' });
    this.doctores = this.service.getPersonasFiltro({ tipo: 'doctor' });
  }

  constructor(
    private service: AdministracionPacientesDoctoresService,
    private reservaTurnoSrv: ReservaTurnosService
  ) { }

  cancelarTurno(id: string) {
    this.reservaTurnoSrv.actualizarEstado(id);
    this.reservas = this.reservaTurnoSrv.obtenerReservaTurnos();
  }

  filtrar() {
    this.reservas = this.reservaTurnoSrv.getReservaTurnosFiltro(this.filtros);
  }
}
