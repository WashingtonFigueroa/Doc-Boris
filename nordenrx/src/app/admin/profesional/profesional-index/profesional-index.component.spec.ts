import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalIndexComponent } from './profesional-index.component';

describe('ProfesionalIndexComponent', () => {
  let component: ProfesionalIndexComponent;
  let fixture: ComponentFixture<ProfesionalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
