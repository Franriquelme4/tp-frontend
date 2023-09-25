import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {CategoriaService} from "../../../services/categoria.service";
@Component({
  selector: 'app-administracion-categorias-editar',
  templateUrl: './administracion-categorias-editar.component.html',
  styleUrls: ['./administracion-categorias-page.component.css']
})
export class AdministracionCategoriasEditarComponent implements OnInit {
  public form:FormGroup;
  formData: any = {};
  idCategoria:string = '';

  constructor(
    private fb:FormBuilder,
    private admistracionService:CategoriaService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.form =  this.fb.group({
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCategoria = params.get('id') || '';
      if (this.idCategoria) {
        const categoria = this.admistracionService.encontrarCategoriaPorId(this.idCategoria);
        if (categoria) {
          this.form.patchValue(categoria);
        } else {
          // No se encontró una persona con el id especificado, redirigir a la página de error 404 o a la página de administración de personas.
          this.router.navigate(['/categorias']);
        }
      }
    });

  }

  onSubmit() {
    if(this.form.invalid) return
    const categoria = {...this.form.value,id:this.idCategoria};
    this.admistracionService.editarCategoria(categoria);
    this.router.navigate(['/pacientes-doctores']);
  }

}
