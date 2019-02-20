import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCreateComponent } from './tipo-create.component';

describe('TipoCreateComponent', () => {
  let component: TipoCreateComponent;
  let fixture: ComponentFixture<TipoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
