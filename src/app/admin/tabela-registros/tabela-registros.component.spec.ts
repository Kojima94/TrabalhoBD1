import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaRegistrosComponent } from './tabela-registros.component';

describe('TabelaRegistrosComponent', () => {
  let component: TabelaRegistrosComponent;
  let fixture: ComponentFixture<TabelaRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
