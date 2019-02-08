import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCreateComponent } from './reporte-create.component';

describe('ReporteCreateComponent', () => {
  let component: ReporteCreateComponent;
  let fixture: ComponentFixture<ReporteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
