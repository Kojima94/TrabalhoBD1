import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaUsuariosComponent } from './tabela-usuarios.component';

describe('TabelaUsuariosComponent', () => {
  let component: TabelaUsuariosComponent;
  let fixture: ComponentFixture<TabelaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
