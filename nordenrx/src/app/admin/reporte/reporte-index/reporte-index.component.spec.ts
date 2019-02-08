import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIndexComponent } from './reporte-index.component';

describe('ReporteIndexComponent', () => {
  let component: ReporteIndexComponent;
  let fixture: ComponentFixture<ReporteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
