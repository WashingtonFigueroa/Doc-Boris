import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesCreateComponent } from './sucursales-create.component';

describe('SucursalesCreateComponent', () => {
  let component: SucursalesCreateComponent;
  let fixture: ComponentFixture<SucursalesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
