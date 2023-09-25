import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AdministracionCategoriasEditarComponent} from "./administracion-categorias-editar.component";

describe('AdministracionCategoriasEditarComponent', () => {
  let component: AdministracionCategoriasEditarComponent;
  let fixture: ComponentFixture<AdministracionCategoriasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracionCategoriasEditarComponent]
    });
    fixture = TestBed.createComponent(AdministracionCategoriasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
