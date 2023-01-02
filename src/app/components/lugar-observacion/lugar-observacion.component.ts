import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LugarObservacion } from 'app/models/lugar-observacion.interface';
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
    private _notificacion: NotificacionService
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
    this.lugaresObservacion = [
      {
        id: 1,
        nombre: "Tanques de sepe",
      },
      {
        id: 2,
        nombre: "Puerto",
      },
    ];
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

  async eliminarLugarObservacion(id: number) {
    
    Swal.fire({
      title:  "Eliminar lugar de la observación ? ",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       
      }
    });
  }
  guardarLugarObservacion() {
    if (this.lugarObservacionSeleccionado === undefined) {
      
    } else {
     
    }
  }

}
