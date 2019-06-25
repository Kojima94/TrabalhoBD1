import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistroComponent } from './edit-registro.component';

describe('EditRegistroComponent', () => {
  let component: EditRegistroComponent;
  let fixture: ComponentFixture<EditRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
