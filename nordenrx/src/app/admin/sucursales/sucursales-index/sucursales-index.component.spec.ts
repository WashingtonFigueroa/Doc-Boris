import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesIndexComponent } from './sucursales-index.component';

describe('SucursalesIndexComponent', () => {
  let component: SucursalesIndexComponent;
  let fixture: ComponentFixture<SucursalesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
