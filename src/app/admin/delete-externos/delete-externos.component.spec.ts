import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExternosComponent } from './delete-externos.component';

describe('DeleteExternosComponent', () => {
  let component: DeleteExternosComponent;
  let fixture: ComponentFixture<DeleteExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
