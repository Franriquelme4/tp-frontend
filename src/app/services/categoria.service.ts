import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);

  constructor() { }

  guardarCategorias(categorias: Categoria[]){
    sessionStorage.setItem('categorias', JSON.stringify(categorias));
  }

  obtenerCategorias(): Categoria[]{
    const categorias = sessionStorage.getItem('categorias') as string;
    const categoriasObj = JSON.parse(categorias ?? '[]') as Categoria[];
    return categoriasObj;
  }

  get categorias$(): Observable<Categoria[]>{
    return this.categoriasSubject.asObservable();
  }

  cargarCategorias(): void{
    const categorias = this.obtenerCategorias();
    this.categoriasSubject.next(categorias);
  }

  setCategoriaNueva(nuevaCategoria: Categoria): void{
    const categorias = this.obtenerCategorias();
    this.categoriasSubject.next([nuevaCategoria, ...categorias]);
    this.guardarCategorias(this.categoriasSubject.value);
  }

  eliminarCategoria(idCategoria: string): void{
    const categorias = this.obtenerCategorias();
    const nuevasCategorias = categorias.filter(cat => cat.id !== idCategoria)
    this.categoriasSubject.next(nuevasCategorias);
    this.guardarCategorias(this.categoriasSubject.value);
  }

  editarCategoria(categoria: Categoria) {
    const categorias = this.obtenerCategorias();
    console.log(categoria,categoria);
    const index = categorias.findIndex(p => p.id === categoria.id);
    console.log(index);
    if (index !== -1) {
      console.log('index', index);
      // Actualiza la persona en el array de personas
      categorias[index] = categoria;
      // Actualiza el sessionStorage con el array actualizado
      this.categorias = categorias;
    }
  }
  set categorias(categorias: Categoria[]){
    this.guardarCategorias(categorias);
  }

  encontrarCategoriaPorId(id: string): Categoria | undefined{
    const categorias = this.obtenerCategorias();
    const categoria = categorias.find(cat => cat.id === id);
    return categoria;
  }
}

export class AdministracionCategoriaService {
}
