import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUpdateComponent } from './tipo-update.component';

describe('TipoUpdateComponent', () => {
  let component: TipoUpdateComponent;
  let fixture: ComponentFixture<TipoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
