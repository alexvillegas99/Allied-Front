import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Proceso } from 'app/models/proceso.interface';
import { NotificacionService } from 'app/services/notificacion.service';
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
    private _notificacion: NotificacionService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  procesoForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Proceso"];

  ngOnInit(): void {
    this.getTipoFormulario();
  }
  getTipoFormulario() {
    this.procesos = [
      {
        id: 1,
        nombre: "Supervición",
      },
      {
        id: 2,
        nombre: "Revisión",
      },
    ];
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

  async eliminarProceso(id: number) {
    
    Swal.fire({
      title:  "Eliminar proceso ? ",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       
      }
    });
  }
  guardarProceso() {
    if (this.procesoSeleccionado === undefined) {
      
    } else {
     
    }
  }
}
