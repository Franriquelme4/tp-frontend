import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTurnosPageComponent } from './reserva-turnos-page.component';

describe('ReservaTurnosPageComponent', () => {
  let component: ReservaTurnosPageComponent;
  let fixture: ComponentFixture<ReservaTurnosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaTurnosPageComponent]
    });
    fixture = TestBed.createComponent(ReservaTurnosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
