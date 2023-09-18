import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-ficha-clinica-crear',
  templateUrl: './ficha-clinica-crear.component.html',
  styleUrls: ['./ficha-clinica-crear.component.css']
})
export class FichaClinicaCrearComponent {
  pacientes:Persona[] = [];
  doctores:Persona[] = [];
  public form:FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private personaService:AdministracionPacientesDoctoresService,
    private fichaClinicaSvc: FichaClinicaService,
    private route:Router
  ) {
    this.form = this.fb.group({
      paciente: ['',Validators.required],
      doctor: ['',Validators.required],
      fecha: ['',Validators.required],
      diagnostico: ['',Validators.required],
    });
  }
   
  ngOnInit(): void {
    this.pacientes = this.personaService.getPersonasFiltro({tipo:'paciente'});
    this.doctores = this.personaService.getPersonasFiltro({tipo:'doctor'});
  }

  onSubmit(): void{
    if(this.form.invalid) return
    const value = this.form.value;


    const valueRequest: FichaClinica = {
      ...value,
      id:uuid.v4(),
      paciente:this.personaService.encontrarPersonaPorId(value.paciente),
      doctor:this.personaService.encontrarPersonaPorId(value.doctor),
    }

    this.fichaClinicaSvc.crearFichaClinica(valueRequest);
    this.form.reset();
    this.route.navigate(['/ficha-clinica']);
  }
}
