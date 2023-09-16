import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-administracion-pacientes-doctores-editar',
  templateUrl: './administracion-pacientes-doctores-editar.component.html',
  styleUrls: ['./administracion-pacientes-doctores-editar.component.css']
})
export class AdministracionPacientesDoctoresEditarComponent implements OnInit {
  public form:FormGroup;
  formData: any = {};
  idPersona:string = '';

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
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idPersona = params.get('id') || '';
      if (this.idPersona) {
        const persona = this.admistracionService.encontrarPersonaPorId(this.idPersona);
        if (persona) {
          this.form.patchValue(persona);
        } else {
          // No se encontró una persona con el id especificado, redirigir a la página de error 404 o a la página de administración de personas.
          this.router.navigate(['/pacientes-doctores']);
        }
      }
    });

  }

  onSubmit() {
    if(this.form.invalid) return
    const persona = {...this.form.value,id:this.idPersona};
    this.admistracionService.editarPersona(persona);
    this.router.navigate(['/pacientes-doctores']);
  }

}
