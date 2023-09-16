import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdministracionCategoriasPageComponent } from './pages/administracion-categorias-page/administracion-categorias-page.component';
import { AdministracionPacientesDoctoresPageComponent } from './pages/administracion-pacientes-doctores-page/administracion-pacientes-doctores-page.component';
import { FichaClinicaPageComponent } from './pages/ficha-clinica-page/ficha-clinica-page.component';
import { ReservaTurnosPageComponent } from './pages/reserva-turnos-page/reserva-turnos-page.component';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';
import { AdministracionPacientesDoctoresCrearComponent } from './pages/administracion-pacientes-doctores-page/administracion-pacientes-doctores-crear/administracion-pacientes-doctores-crear.component';
import { AdministracionPacientesDoctoresEditarComponent } from './pages/administracion-pacientes-doctores-page/administracion-pacientes-doctores-editar/administracion-pacientes-doctores-editar.component';


const routes: Routes = [
  {
    path: '', // This is the default route
    component: LayoutComponent,
    children: [
      {path:'categorias',component:AdministracionCategoriasPageComponent},
      {path:'pacientes-doctores',component:AdministracionPacientesDoctoresPageComponent},
      {path:'categorias',component:AdministracionCategoriasPageComponent},
      {path:'pacientes-doctores/crear',component:AdministracionPacientesDoctoresCrearComponent},
      {path:'pacientes-doctores/editar/:id',component:AdministracionPacientesDoctoresEditarComponent},
      {path:'ficha-clinica',component:FichaClinicaPageComponent},
      {path:'reserva-turnos',component:ReservaTurnosPageComponent},
      {path:'reportes',component:ReportesPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
