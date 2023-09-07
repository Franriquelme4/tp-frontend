import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaPageComponent } from './ficha-clinica-page.component';

describe('FichaClinicaPageComponent', () => {
  let component: FichaClinicaPageComponent;
  let fixture: ComponentFixture<FichaClinicaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaClinicaPageComponent]
    });
    fixture = TestBed.createComponent(FichaClinicaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
