import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { TipoFormulario } from "app/models/tipo-formulario.interface";
import { NotificacionService } from "app/services/notificacion.service";
import { RolesService } from "app/services/roles.service";
import { TipoFormularioService } from "app/services/tipo-formulario.service";
import { UsuariosService } from "app/services/usuarios.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-tipo-de-formularios",
  templateUrl: "./tipo-de-formularios.component.html",
  styleUrls: ["./tipo-de-formularios.component.css"],
})
export class TipoDeFormulariosComponent implements OnInit {
  tipoFormularios: TipoFormulario[] = [];
  modal: NgbModalRef;
  tipoFormularioSeleccionado: TipoFormulario = undefined;
  page = 1;
  pageSize = 10;
  constructor(
    private config: NgbModalConfig,
    private _usuariosService: UsuariosService,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _tipoFormularioService:TipoFormularioService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  TipoFormularioForm = this.fb.group({
    tipo: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Tipo Formulario"];

  ngOnInit(): void {
    this.getTipoFormulario();
  }
  getTipoFormulario() {
    this._tipoFormularioService.Get().subscribe((result)=>{
      this.tipoFormularios=result;
    })
  
  }

  open(content, tipoFormulario?: TipoFormulario): void {
    this.tipoFormularioSeleccionado = tipoFormulario;
    if (this.tipoFormularioSeleccionado != undefined) {
      this.TipoFormularioForm.controls.tipo.setValue(this.tipoFormularioSeleccionado.tipo);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.TipoFormularioForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.TipoFormularioForm.reset();
    this.tipoFormularioSeleccionado = undefined;
  }

  async cambiarEstado(id: number,estado:boolean) {
    Swal.fire({
      title:   !estado ? "Habilitar Usuario?" : "Deshabilitar  Usuario?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._tipoFormularioService.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('Tipo de formulario ah sido actualizado','success');
        this.getTipoFormulario();
       })
      }
    });
  }
  guardarTipoFormulario() {
    if (this.tipoFormularioSeleccionado === undefined) {
      this._tipoFormularioService
        .Save(this.TipoFormularioForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El tipo de formulario a sido agregado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getTipoFormulario();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._tipoFormularioService
        .Edit(
          this.tipoFormularioSeleccionado.id,
          this.TipoFormularioForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El tipo de formulario a sido actualizado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getTipoFormulario();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    }
  }
}
