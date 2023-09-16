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

  set categorias(categorias: Categoria[]){
    this.guardarCategorias(categorias);
  }

  encontrarCategoriaPorId(id: string): Categoria | undefined{
    const categorias = this.obtenerCategorias();
    const categoria = categorias.find(cat => cat.id === id);
    return categoria;
  }
}
