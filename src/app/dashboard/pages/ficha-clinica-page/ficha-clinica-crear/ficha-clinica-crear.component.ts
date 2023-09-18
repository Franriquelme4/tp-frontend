import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica.interface';
import { ReservaTurno } from 'src/app/interfaces/reserva-turno.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import { ReservaTurnosService } from 'src/app/services/reserva-turnos.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-ficha-clinica-crear',
  templateUrl: './ficha-clinica-crear.component.html',
  styleUrls: ['./ficha-clinica-crear.component.css']
})
export class FichaClinicaCrearComponent {
  pacientes:Persona[] = [];
  doctores:Persona[] = [];
  turnos: ReservaTurno[] = [];
  public form:FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private personaService:AdministracionPacientesDoctoresService,
    private fichaClinicaSvc: FichaClinicaService,
    private reservaTurnosSvc: ReservaTurnosService,
    private route:Router
  ) {
    this.form = this.fb.group({
      paciente: '',
      doctor:'',
      fecha: '',
      diagnostico: ['',Validators.required],
      turno: undefined
    });
  }
   
  ngOnInit(): void {
    this.pacientes = this.personaService.getPersonasFiltro({tipo:'paciente'});
    this.doctores = this.personaService.getPersonasFiltro({tipo:'doctor'});
    this.turnos = this.reservaTurnosSvc.ReservaTurnos;
  }

  onSubmit(): void{
    if(this.form.invalid) return
    const value = this.form.value;
    let valueRequest: FichaClinica | undefined;

    console.log(value);

    if(!value.turno){
      valueRequest = {
        ...value,
        id:uuid.v4(),
        paciente:this.personaService.encontrarPersonaPorId(value.paciente),
        doctor:this.personaService.encontrarPersonaPorId(value.doctor),
      } as FichaClinica

      this.fichaClinicaSvc.crearFichaClinica(valueRequest);
    }else{
      const turnoSeleccionado = this.reservaTurnosSvc.encontrarReservaTurnoPorId(value.turno);
      if(!turnoSeleccionado) return;

      valueRequest = {
        id:uuid.v4(),
        paciente:turnoSeleccionado.paciente,
        doctor:turnoSeleccionado.doctor,
        fecha: turnoSeleccionado.fecha,
        diagnostico: value.diagnostico
      } as FichaClinica

      this.fichaClinicaSvc.crearFichaClinica(valueRequest);
    }


    this.form.reset();
    this.route.navigate(['/ficha-clinica']);
  }
}
