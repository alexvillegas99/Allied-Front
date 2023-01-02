import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GrupoPreguntas } from 'app/models/grupo-pregunta.interface';
import { GrupoPreguntasService } from 'app/services/grupo-preguntas.service';
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
    private _notificacion: NotificacionService,
    private _grupoPreguntaServie:GrupoPreguntasService
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
    this._grupoPreguntaServie.Get().subscribe(res=>{
      this.gruposPreguntas=res;
    })
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
  async cambiarEstado(id: number,estado:boolean) {
    Swal.fire({
      title:   !estado ? "Habilitar grupo pregunta?" : "Deshabilitar  grupo pregunta?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._grupoPreguntaServie.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('El grupo de pregunta ah sido actualizado','success');
        this.getGruposDePreguntas();
       })
      }
    });
  }
 
  guardarGrupoPreguntas() {
    if (this.grupoPreguntaSeleccionado === undefined) {
      this._grupoPreguntaServie
        .Save(this.grupoPreguntaForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El grupo de preguntas a sido agregado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getGruposDePreguntas();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._grupoPreguntaServie
        .Edit(
          this.grupoPreguntaSeleccionado.id,
          this.grupoPreguntaForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El grupo de preguntas a sido actualizado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getGruposDePreguntas();
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
