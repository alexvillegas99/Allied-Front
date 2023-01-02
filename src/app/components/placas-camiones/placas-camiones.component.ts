import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlacaCamion } from 'app/models/placa-camion.interface';
import { NotificacionService } from 'app/services/notificacion.service';
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
    private _notificacion: NotificacionService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  placasCamionesForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Placa camion"];

  ngOnInit(): void {
    this.getTipoFormulario();
  }
  getTipoFormulario() {
    this.placasCamiones = [
      {
        id: 1,
        nombre: "TBA-123",
      },
      {
        id: 2,
        nombre: "HBA-312",
      },
    ];
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

  async eliminarPlacaCamion(id: number) {
    
    Swal.fire({
      title:  "Eliminar placa ? ",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       
      }
    });
  }
  guardarPlacaCamion() {
    if (this.placaCamionSeleccionado === undefined) {
      
    } else {
     
    }
  }
}
