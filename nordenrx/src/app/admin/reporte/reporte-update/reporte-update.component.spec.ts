import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUpdateComponent } from './reporte-update.component';

describe('ReporteUpdateComponent', () => {
  let component: ReporteUpdateComponent;
  let fixture: ComponentFixture<ReporteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
