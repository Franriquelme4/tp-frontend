import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AdministracionCategoriasPageComponent } from './pages/administracion-categorias-page/administracion-categorias-page.component';
import { AdministracionPacientesDoctoresPageComponent } from './pages/administracion-pacientes-doctores-page/administracion-pacientes-doctores-page.component';
import { ReservaTurnosPageComponent } from './pages/reserva-turnos-page/reserva-turnos-page.component';
import { FichaClinicaPageComponent } from './pages/ficha-clinica-page/ficha-clinica-page.component';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AdministracionCategoriasPageComponent,
    AdministracionPacientesDoctoresPageComponent,
    ReservaTurnosPageComponent,
    FichaClinicaPageComponent,
    ReportesPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
