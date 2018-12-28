import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiografiaComponent } from './radiografia.component';

describe('RadiografiaComponent', () => {
  let component: RadiografiaComponent;
  let fixture: ComponentFixture<RadiografiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiografiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
