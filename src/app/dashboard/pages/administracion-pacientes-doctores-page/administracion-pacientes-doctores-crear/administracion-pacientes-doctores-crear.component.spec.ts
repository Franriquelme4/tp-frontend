import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionPacientesDoctoresCrearComponent } from './administracion-pacientes-doctores-crear.component';

describe('AdministracionPacientesDoctoresCrearComponent', () => {
  let component: AdministracionPacientesDoctoresCrearComponent;
  let fixture: ComponentFixture<AdministracionPacientesDoctoresCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionPacientesDoctoresCrearComponent]
    });
    fixture = TestBed.createComponent(AdministracionPacientesDoctoresCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
