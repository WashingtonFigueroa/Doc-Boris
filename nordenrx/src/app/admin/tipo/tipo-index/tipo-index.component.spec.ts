import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIndexComponent } from './tipo-index.component';

describe('TipoIndexComponent', () => {
  let component: TipoIndexComponent;
  let fixture: ComponentFixture<TipoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
