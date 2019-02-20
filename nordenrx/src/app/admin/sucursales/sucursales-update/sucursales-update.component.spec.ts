import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesUpdateComponent } from './sucursales-update.component';

describe('SucursalesUpdateComponent', () => {
  let component: SucursalesUpdateComponent;
  let fixture: ComponentFixture<SucursalesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
