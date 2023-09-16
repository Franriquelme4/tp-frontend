import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTurnoCrearComponent } from './reserva-turno-crear.component';

describe('ReservaTurnoCrearComponent', () => {
  let component: ReservaTurnoCrearComponent;
  let fixture: ComponentFixture<ReservaTurnoCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaTurnoCrearComponent]
    });
    fixture = TestBed.createComponent(ReservaTurnoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
