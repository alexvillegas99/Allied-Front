import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Proceso } from 'app/models/proceso.interface';
import { NotificacionService } from 'app/services/notificacion.service';
import { ProcesosService } from 'app/services/procesos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
  procesos: Proceso[] = [];
  modal: NgbModalRef;
  procesoSeleccionado: Proceso = undefined;
  page = 1;
  pageSize = 10;
  constructor(
    private config: NgbModalConfig,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _procesosService:ProcesosService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  procesoForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Proceso"];

  ngOnInit(): void {
    this.getProcesos();
  }
  getProcesos() {
   this._procesosService.Get().subscribe(res=>{
    this.procesos=res;
   })
  }

  open(content, proceso?: Proceso): void {
    this.procesoSeleccionado = proceso;
    if (this.procesoSeleccionado != undefined) {
      this.procesoForm.controls.nombre.setValue(this.procesoSeleccionado.nombre);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.procesoForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.procesoForm.reset();
    this.procesoSeleccionado = undefined;
  }

  async cambiarEstado(id: number,estado:boolean) {
    
    Swal.fire({
      title:   !estado ? "Habilitar Proceso?" : "Deshabilitar  Proceso?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._procesosService.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('El proceso ah sido actualizado','success');
        this.getProcesos();
       })
      }
    });
  }
  guardarProceso() {
    
    if (this.procesoSeleccionado === undefined) {
      this._procesosService
        .Save(this.procesoForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El proceso a sido agregado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getProcesos();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._procesosService
        .Edit(
          this.procesoSeleccionado.id,
          this.procesoForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El proceso a sido actualizado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getProcesos();
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
