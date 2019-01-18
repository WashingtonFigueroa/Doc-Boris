import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaIndexComponent } from './consulta-index.component';

describe('ConsultaIndexComponent', () => {
  let component: ConsultaIndexComponent;
  let fixture: ComponentFixture<ConsultaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
