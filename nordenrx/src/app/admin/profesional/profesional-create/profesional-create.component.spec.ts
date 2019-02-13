import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalCreateComponent } from './profesional-create.component';

describe('ProfesionalCreateComponent', () => {
  let component: ProfesionalCreateComponent;
  let fixture: ComponentFixture<ProfesionalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
