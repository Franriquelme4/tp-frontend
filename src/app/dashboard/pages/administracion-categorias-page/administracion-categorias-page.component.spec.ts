import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionCategoriasPageComponent } from './administracion-categorias-page.component';

describe('AdministracionCategoriasPageComponent', () => {
  let component: AdministracionCategoriasPageComponent;
  let fixture: ComponentFixture<AdministracionCategoriasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionCategoriasPageComponent]
    });
    fixture = TestBed.createComponent(AdministracionCategoriasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
