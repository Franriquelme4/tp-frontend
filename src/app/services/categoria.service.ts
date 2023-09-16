import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  get categorias(): Categoria[]{
    const categorias = sessionStorage.getItem('categorias') as string;
    const categoriasObj = JSON.parse(categorias ?? '[]') as Categoria[];
    return categoriasObj;
  }

  setCategoriaNueva(nuevaCategoria: Categoria): void{
    const categorias = sessionStorage.getItem('categorias') as string;
    const categoriasObj = JSON.parse(categorias ?? '[]') as Categoria[];
    categoriasObj.push(nuevaCategoria)
    sessionStorage.setItem('categorias', JSON.stringify(categoriasObj));
  }

  set categorias(categorias: Categoria[]){
    sessionStorage.setItem('categorias', JSON.stringify(categorias));
  }

  encontrarCategoriaPorId(id: string): Categoria | undefined{
    const categorias = sessionStorage.getItem('categorias') as string;
    const categoriasObj = JSON.parse(categorias ?? '[]') as Categoria[];
    const categoria = categoriasObj.find(cat => cat.id === id);
    return categoria;
  }
}
