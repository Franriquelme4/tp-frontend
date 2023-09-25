import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/interfaces/categoria.interface';
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

  categorias$ = this.categoriasSvc.categorias$;
  categorias: Categoria[] = []

  constructor(private categoriasSvc: CategoriaService){}

  ngOnInit(): void{
    this.categoriasSvc.cargarCategorias();
    this.categorias$.subscribe(categorias => this.categorias = categorias);
  }

  crearForm(){
    this.categoriasSvc.setCategoriaNueva({id: uuid.v4(), description: this.categoriaForm.value.descripcion ?? ""})
  }

  eliminarCat(id: string){
    this.categoriasSvc.eliminarCategoria(id)
  }

  editarCat(id: string, descripcion:string){
    // this.categoriasSvc.editarCategoria(id,descripcion)
  }






}
