import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministracionPacientesDoctoresService } from '../../../../services/administracion-pacientes-doctores.service';
import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-administracion-pacientes-doctores-crear',
  templateUrl: './administracion-pacientes-doctores-crear.component.html',
  styleUrls: ['./administracion-pacientes-doctores-crear.component.css']
})
export class AdministracionPacientesDoctoresCrearComponent {
  public form:FormGroup;
  formData: any = {};

  constructor(
    private fb:FormBuilder,
    private admistracionService:AdministracionPacientesDoctoresService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.form =  this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      cedula:['', Validators.required],
      esDoctor:[false, Validators.required],
    });
  }

  onSubmit() {
    if(this.form.invalid) return
    this.admistracionService.setPersonaNueva({...this.form.value,id:uuid.v4()});
    const value = this.form.value;
    // Aquí puedes manejar la lógica de envío del formulario, como enviar los datos al servidor o realizar otras acciones.
    console.log(value);
    this.router.navigate(['/pacientes-doctores']);

  }

}
