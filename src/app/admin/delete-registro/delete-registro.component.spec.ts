import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRegistroComponent } from './delete-registro.component';

describe('DeleteRegistroComponent', () => {
  let component: DeleteRegistroComponent;
  let fixture: ComponentFixture<DeleteRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
