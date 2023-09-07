import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionPacientesDoctoresPageComponent } from './administracion-pacientes-doctores-page.component';

describe('AdministracionPacientesDoctoresPageComponent', () => {
  let component: AdministracionPacientesDoctoresPageComponent;
  let fixture: ComponentFixture<AdministracionPacientesDoctoresPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionPacientesDoctoresPageComponent]
    });
    fixture = TestBed.createComponent(AdministracionPacientesDoctoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
