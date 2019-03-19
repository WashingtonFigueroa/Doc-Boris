import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesIndexComponent } from './mensajes-index.component';

describe('MensajesIndexComponent', () => {
  let component: MensajesIndexComponent;
  let fixture: ComponentFixture<MensajesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
