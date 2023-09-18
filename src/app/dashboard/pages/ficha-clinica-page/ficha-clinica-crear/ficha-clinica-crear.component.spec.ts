import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaCrearComponent } from './ficha-clinica-crear.component';

describe('FichaClinicaCrearComponent', () => {
  let component: FichaClinicaCrearComponent;
  let fixture: ComponentFixture<FichaClinicaCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaClinicaCrearComponent]
    });
    fixture = TestBed.createComponent(FichaClinicaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
