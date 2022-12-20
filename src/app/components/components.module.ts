import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDeFormulariosComponent } from './tipo-de-formularios/tipo-de-formularios.component';
import { ClimaComponent } from './clima/clima.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { PlacasCamionesComponent } from './placas-camiones/placas-camiones.component';
import { LugarObservacionComponent } from './lugar-observacion/lugar-observacion.component';
import { GrupoPreguntasComponent } from './grupo-preguntas/grupo-preguntas.component';



@NgModule({
  declarations: [TipoDeFormulariosComponent, ClimaComponent, ProcesosComponent, PlacasCamionesComponent, LugarObservacionComponent, GrupoPreguntasComponent],
  exports: [TipoDeFormulariosComponent, ClimaComponent, ProcesosComponent, PlacasCamionesComponent, LugarObservacionComponent, GrupoPreguntasComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
