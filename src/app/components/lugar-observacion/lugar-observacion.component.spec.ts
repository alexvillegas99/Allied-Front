import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarObservacionComponent } from './lugar-observacion.component';

describe('LugarObservacionComponent', () => {
  let component: LugarObservacionComponent;
  let fixture: ComponentFixture<LugarObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugarObservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
