import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LbdModule } from "../../lbd/lbd.module";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { HomeComponent } from "../../home/home.component";
import { ReportesComponent } from "../../reportes/reportes.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsuariosComponent } from "app/usuarios/usuarios.component";
import { UserComponent } from "app/user/user.component";
import { ConfiguracionComponent } from "app/configuracion/configuracion.component";
import { ComponentsModule } from "app/components/components.module";
import { FormulariosComponent } from "app/formularios/formularios.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NgbModule,
    ComponentsModule
  ],
  declarations: [
    HomeComponent,
    ReportesComponent,
    UsuariosComponent,
    UserComponent,
    ConfiguracionComponent,
    FormulariosComponent
  ],
  
})
export class AdminLayoutModule {}
