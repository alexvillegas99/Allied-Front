import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlacaCamion } from 'app/models/placa-camion.interface';
import { NotificacionService } from 'app/services/notificacion.service';
import { PlacasCamionesService } from 'app/services/placas-camiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-placas-camiones',
  templateUrl: './placas-camiones.component.html',
  styleUrls: ['./placas-camiones.component.css']
})
export class PlacasCamionesComponent implements OnInit {

  placasCamiones: PlacaCamion[] = [];
  modal: NgbModalRef;
  placaCamionSeleccionado: PlacaCamion = undefined;
  page = 1;
  pageSize = 10;
  constructor(
    private config: NgbModalConfig,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _placasService:PlacasCamionesService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  placasCamionesForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Placa camion"];

  ngOnInit(): void {
    this.getTipoPlaca();
  }
  getTipoPlaca() {
    this._placasService.Get().subscribe(res=>{
      this.placasCamiones=res;
    })
  }

  open(content, placa?: PlacaCamion): void {
    this.placaCamionSeleccionado = placa;
    if (this.placaCamionSeleccionado != undefined) {
      this.placasCamionesForm.controls.nombre.setValue(this.placaCamionSeleccionado.nombre);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.placasCamionesForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.placasCamionesForm.reset();
    this.placaCamionSeleccionado = undefined;
  }
  async cambiarEstado(id: number,estado:boolean) {
    Swal.fire({
      title:   !estado ? "Habilitar Placa?" : "Deshabilitar  Placa?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._placasService.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('La placa ah sido actualizada','success');
        this.getTipoPlaca();
       })
      }
    });
  }
  
  guardarPlacaCamion() {
    if (this.placaCamionSeleccionado === undefined) {
      this._placasService
        .Save(this.placasCamionesForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "La placa a sido agregada correctamente",
                "success"
              );
              this.cerrarModal();
              this.getTipoPlaca();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._placasService
        .Edit(
          this.placaCamionSeleccionado.id,
          this.placasCamionesForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "La placa a sido actualizada correctamente",
                "success"
              );
              this.cerrarModal();
              this.getTipoPlaca();
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
