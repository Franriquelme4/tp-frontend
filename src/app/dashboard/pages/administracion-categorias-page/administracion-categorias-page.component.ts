import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as uuid from 'uuid';


@Component({
  selector: 'app-administracion-categorias-page',
  templateUrl: './administracion-categorias-page.component.html',
  styleUrls: ['./administracion-categorias-page.component.css']
})
export class AdministracionCategoriasPageComponent {
  categoriaForm = new FormGroup({
    descripcion: new FormControl(""),
  });

  constructor(private categoriasSvc: CategoriaService){}

  crearForm(){
    this.categoriasSvc.setCategoriaNueva({id: uuid.v4(), description: this.categoriaForm.value.descripcion ?? ""})
  }
}
