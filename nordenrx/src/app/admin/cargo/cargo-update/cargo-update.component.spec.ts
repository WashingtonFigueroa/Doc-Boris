import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoUpdateComponent } from './cargo-update.component';

describe('CargoUpdateComponent', () => {
  let component: CargoUpdateComponent;
  let fixture: ComponentFixture<CargoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
