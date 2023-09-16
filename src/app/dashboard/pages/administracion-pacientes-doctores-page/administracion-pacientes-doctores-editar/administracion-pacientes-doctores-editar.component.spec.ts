import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionPacientesDoctoresEditarComponent } from './administracion-pacientes-doctores-editar.component';

describe('AdministracionPacientesDoctoresEditarComponent', () => {
  let component: AdministracionPacientesDoctoresEditarComponent;
  let fixture: ComponentFixture<AdministracionPacientesDoctoresEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionPacientesDoctoresEditarComponent]
    });
    fixture = TestBed.createComponent(AdministracionPacientesDoctoresEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
