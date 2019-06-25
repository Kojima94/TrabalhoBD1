import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarExternosComponent } from './criar-externos.component';

describe('CriarExternosComponent', () => {
  let component: CriarExternosComponent;
  let fixture: ComponentFixture<CriarExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
