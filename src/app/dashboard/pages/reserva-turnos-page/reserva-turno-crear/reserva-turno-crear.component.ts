import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaTurnosService } from 'src/app/services/reserva-turnos.service';
import { AdministracionPacientesDoctoresService } from '../../../../services/administracion-pacientes-doctores.service';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { ReservaTurno, Turno } from '../../../../interfaces/reserva-turno.interface';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reserva-turno-crear',
  templateUrl: './reserva-turno-crear.component.html',
  styleUrls: ['./reserva-turno-crear.component.css']
})
export class ReservaTurnoCrearComponent implements OnInit {
  pacientes:Persona[] = [];
  doctores:Persona[] = [];
  turnos:Turno[] = [
    { id:1, inicio: '09:00', fin: '10:00' },
    { id:2 ,inicio: '10:00', fin: '11:00' },
    { id:3 ,inicio: '11:00', fin: '12:00' },
    { id:4 ,inicio: '12:00', fin: '13:00' },
    { id:5 ,inicio: '13:00', fin: '14:00' },
    { id:6 ,inicio: '14:00', fin: '15:00' },
    { id:7 ,inicio: '15:00', fin: '16:00' },
    { id:8 ,inicio: '16:00', fin: '17:00' },
    { id:9 ,inicio: '17:00', fin: '18:00' },
    { id:10 ,inicio: '18:00', fin: '19:00' },
    { id:11 ,inicio: '19:00', fin: '20:00' },
    { id:12 ,inicio: '20:00', fin: '21:00' },
  ];
  public form:FormGroup;
  ngOnInit(): void {
    this.pacientes = this.personaService.getPersonasFiltro({tipo:'paciente'});
    this.doctores = this.personaService.getPersonasFiltro({tipo:'doctor'});
  }
  constructor(
    private fb: FormBuilder,
    private service: ReservaTurnosService,
    private personaService:AdministracionPacientesDoctoresService,
    private route:Router
  ) {
    this.form = this.fb.group({
      paciente: ['',Validators.required],
      doctor: ['',Validators.required],
      fecha: ['',Validators.required],
      turno: ['',Validators.required],
    });
   }


  onSubmit() {
    if(this.form.invalid) return
    const value = this.form.value;
    // Aquí puedes manejar la lógica de envío del formulario, como enviar los datos al servidor o realizar otras acciones.
    const valueRequest:ReservaTurno = {
      ...value,
      id:uuid.v4(),
      paciente:this.personaService.encontrarPersonaPorId(value.paciente),
      doctor:this.personaService.encontrarPersonaPorId(value.doctor),
      turno:this.turnos.find(turno => turno.id === parseInt(value.turno)),
    }
    this.service.setReservaTurnoNueva(valueRequest);
    this.form.reset();
    this.route.navigate(['/reserva-turnos']);
  }



}
