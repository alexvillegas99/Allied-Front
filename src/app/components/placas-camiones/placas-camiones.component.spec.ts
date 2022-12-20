import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacasCamionesComponent } from './placas-camiones.component';

describe('PlacasCamionesComponent', () => {
  let component: PlacasCamionesComponent;
  let fixture: ComponentFixture<PlacasCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacasCamionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacasCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
