import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FichaClinica } from '../interfaces/ficha-clinica.interface';
import { FiltroReserva } from '../interfaces/reserva-turno.interface';

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaService {
  private fichaClinicaSubject = new BehaviorSubject<FichaClinica[]>([]);

  constructor() { }

  guardarFichasClinicas(fichas: FichaClinica[]){
    sessionStorage.setItem('fichas', JSON.stringify(fichas));
  }

  obtenerFichasClinicas(): FichaClinica[]{
    const categorias = sessionStorage.getItem('fichas') as string;
    const categoriasObj = JSON.parse(categorias ?? '[]') as FichaClinica[];
    return categoriasObj;
  }

  get fichaClinicas$(): Observable<FichaClinica[]>{
    return this.fichaClinicaSubject.asObservable();
  }

  cargarFichasClinicas(){
    const fichas = this.obtenerFichasClinicas();
    this.fichaClinicaSubject.next(fichas);
  }

  crearFichaClinica(nuevaFicha: FichaClinica){
      const fichas = this.obtenerFichasClinicas();
      this.fichaClinicaSubject.next([nuevaFicha, ...fichas]);
      this.guardarFichasClinicas(this.fichaClinicaSubject.value);
  }

  editarFichaClinica(fichaEditar: FichaClinica){
    const fichas = this.obtenerFichasClinicas();
    const nuevasFichas = fichas.map(ficha => fichaEditar.id === ficha.id ? fichaEditar : ficha);
    this.fichaClinicaSubject.next(nuevasFichas);
    this.guardarFichasClinicas(nuevasFichas);
  }

  encontrarFichaClinica(id: string): FichaClinica | undefined{
    const fichas = this.obtenerFichasClinicas();
    const fichaClinica = fichas.find(ficha => ficha.id === id);
    return fichaClinica;
  }

  getFichaClinicasFiltro(filtro: FiltroReserva | any){
    const fichaClinicas = this.obtenerFichasClinicas();
    const fichaClinicasFiltro = fichaClinicas.filter(fichaClinica => {
      let cumpleFiltro = true;
      if(filtro.doctorId !== ''){
        cumpleFiltro = cumpleFiltro && fichaClinica.doctor.id === filtro.doctorId;
      }
      if(filtro.pacienteId !== ''){
        cumpleFiltro = cumpleFiltro && fichaClinica.paciente.id === filtro.pacienteId;
      }
      if(filtro.fechaDesde !== ''){
        cumpleFiltro = cumpleFiltro && fichaClinica.fecha >= filtro.fechaDesde;
      }
      if(filtro.fechaHasta !== ''){
        cumpleFiltro = cumpleFiltro && fichaClinica.fecha <= filtro.fechaHasta;
      }
      return cumpleFiltro;
    });
    return fichaClinicasFiltro;
  }

  eliminarFichaClinica(id: string){
    const fichas = this.obtenerFichasClinicas();
    const nuevasFichas = fichas.filter(ficha => id !== ficha.id);
    this.fichaClinicaSubject.next(nuevasFichas);
    this.guardarFichasClinicas(nuevasFichas);
  }
}
