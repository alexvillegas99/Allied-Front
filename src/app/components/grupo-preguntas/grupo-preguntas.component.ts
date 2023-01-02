import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GrupoPreguntas } from 'app/models/grupo-pregunta.interface';
import { NotificacionService } from 'app/services/notificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-preguntas',
  templateUrl: './grupo-preguntas.component.html',
  styleUrls: ['./grupo-preguntas.component.css']
})
export class GrupoPreguntasComponent implements OnInit {

 
  
  gruposPreguntas: GrupoPreguntas[] = [];
  modal: NgbModalRef;
  grupoPreguntaSeleccionado: GrupoPreguntas = undefined;
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
  grupoPreguntaForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Grupo pregunta"];

  ngOnInit(): void {
    this.getGruposDePreguntas();
  }
  getGruposDePreguntas() {
    this.gruposPreguntas = [
      {
        id: 1,
        nombre: "Lugar de trabajo",
      },
      {
        id: 2,
        nombre: "Centro de operación",
      },
    ];
  }

  open(content, placa?: GrupoPreguntas): void {
    this.grupoPreguntaSeleccionado = placa;
    if (this.grupoPreguntaSeleccionado != undefined) {
      this.grupoPreguntaForm.controls.nombre.setValue(this.grupoPreguntaSeleccionado.nombre);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.grupoPreguntaForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.grupoPreguntaForm.reset();
    this.grupoPreguntaSeleccionado = undefined;
  }

  async eliminarGrupoPreguntas(id: number) {
    
    Swal.fire({
      title:  "Eliminar lugar de la observación ? ",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       
      }
    });
  }
  guardarGrupoPreguntas() {
    if (this.grupoPreguntaSeleccionado === undefined) {
      
    } else {
     
    }
  }

}
