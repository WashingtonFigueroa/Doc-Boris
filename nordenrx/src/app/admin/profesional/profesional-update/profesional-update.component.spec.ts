import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalUpdateComponent } from './profesional-update.component';

describe('ProfesionalUpdateComponent', () => {
  let component: ProfesionalUpdateComponent;
  let fixture: ComponentFixture<ProfesionalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
