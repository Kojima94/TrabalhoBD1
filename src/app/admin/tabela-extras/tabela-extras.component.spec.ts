import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExtrasComponent } from './tabela-extras.component';

describe('TabelaExtrasComponent', () => {
  let component: TabelaExtrasComponent;
  let fixture: ComponentFixture<TabelaExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
