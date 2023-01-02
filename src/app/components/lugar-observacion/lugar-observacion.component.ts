import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LugarObservacion } from 'app/models/lugar-observacion.interface';
import { LugarObservacionService } from 'app/services/lugar-observacion.service';
import { NotificacionService } from 'app/services/notificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lugar-observacion',
  templateUrl: './lugar-observacion.component.html',
  styleUrls: ['./lugar-observacion.component.css']
})
export class LugarObservacionComponent implements OnInit {

  
  lugaresObservacion: LugarObservacion[] = [];
  modal: NgbModalRef;
  lugarObservacionSeleccionado: LugarObservacion = undefined;
  page = 1;
  pageSize = 10;
  constructor(
    private config: NgbModalConfig,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _lugarObservacionService:LugarObservacionService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  lugarObservacionForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Lugar observación"];

  ngOnInit(): void {
    this.getLugarObervacion();
  }
  getLugarObervacion() {
   this._lugarObservacionService.Get().subscribe(res=>{
    this.lugaresObservacion=res;
   })
  }

  open(content, placa?: LugarObservacion): void {
    this.lugarObservacionSeleccionado = placa;
    if (this.lugarObservacionSeleccionado != undefined) {
      this.lugarObservacionForm.controls.nombre.setValue(this.lugarObservacionSeleccionado.nombre);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.lugarObservacionForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.lugarObservacionForm.reset();
    this.lugarObservacionSeleccionado = undefined;
  }

  async cambiarEstado(id: number,estado:boolean) {
    Swal.fire({
      title:   !estado ? "Habilitar lugar observación?" : "Deshabilitar  lugar observación?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._lugarObservacionService.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('El lugar de la observación ah sido actualizado','success');
        this.getLugarObervacion();
       })
      }
    });
  }
  guardarLugarObservacion() {
    if (this.lugarObservacionSeleccionado === undefined) {
      this._lugarObservacionService
        .Save(this.lugarObservacionForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El lugar de la observación a sido agregado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getLugarObervacion();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._lugarObservacionService
        .Edit(
          this.lugarObservacionSeleccionado.id,
          this.lugarObservacionForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El lugar de la observación a sido actualizada¡o correctamente",
                "success"
              );
              this.cerrarModal();
              this.getLugarObervacion();
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
