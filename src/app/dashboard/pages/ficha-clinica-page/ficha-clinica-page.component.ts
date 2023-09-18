import { Component } from '@angular/core';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica.interface';
import { FiltroReserva } from 'src/app/interfaces/reserva-turno.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';

@Component({
  selector: 'app-ficha-clinica-page',
  templateUrl: './ficha-clinica-page.component.html',
  styleUrls: ['./ficha-clinica-page.component.css']
})
export class FichaClinicaPageComponent {
  pacientes: Persona[] = [];
  doctores: Persona[] = [];
  fichas: FichaClinica[] = [];

  filtros: FiltroReserva = {
    doctorId: '',
    pacienteId: '',
    fechaDesde: '',
    fechaHasta: ''
  }

  constructor(
    private admPacienteServices: AdministracionPacientesDoctoresService,
    private fichaClinicaSvc: FichaClinicaService,
  ) { }

  ngOnInit(): void {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque los meses comienzan desde 0
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.filtros.fechaDesde = fechaFormateada;
    this.filtros.fechaHasta = fechaFormateada;
    this.pacientes = this.admPacienteServices.getPersonasFiltro({ tipo: 'paciente' });
    this.doctores = this.admPacienteServices.getPersonasFiltro({ tipo: 'doctor' });

    this.fichaClinicaSvc.cargarFichasClinicas();

    this.fichaClinicaSvc.fichaClinicas$.subscribe(fichas => {
      this.fichas = fichas;
    })
  }

  filtrar() {
    this.fichas = this.fichaClinicaSvc.getFichaClinicasFiltro(this.filtros);
  }

  eliminarFicha(id: string){
    this.fichaClinicaSvc.eliminarFichaClinica(id);
  }
}
