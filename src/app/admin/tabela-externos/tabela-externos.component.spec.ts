import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExternosComponent } from './tabela-externos.component';

describe('TabelaExternosComponent', () => {
  let component: TabelaExternosComponent;
  let fixture: ComponentFixture<TabelaExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
