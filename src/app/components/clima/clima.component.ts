import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { Clima } from "app/models/clima.interface";
import { ClimaService } from "app/services/clima.service";
import { NotificacionService } from "app/services/notificacion.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {


  climas: Clima[] = [];
  modal: NgbModalRef;
  climaSeleccionado: Clima = undefined;
  page = 1;
  pageSize = 10;
  constructor(
    private config: NgbModalConfig,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _climaService:ClimaService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  climaForm = this.fb.group({
    nombre: ["", [Validators.required]],
  });
  encabezados: string[] = ["#", "Clima"];

  ngOnInit(): void {
    this.getClimas();
  }
  getClimas() {
    this._climaService.Get().subscribe((result)=>{
      this.climas=result;
    })
  }

  open(content, clima?: Clima): void {
    this.climaSeleccionado = clima;
    if (this.climaSeleccionado != undefined) {
      this.climaForm.controls.nombre.setValue(this.climaSeleccionado.nombre);
    }
   
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.climaForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.climaForm.reset();
    this.climaSeleccionado = undefined;
  }

  async cambiarEstado(id: number,estado:boolean) {
    
    Swal.fire({
      title:   !estado ? "Habilitar Clima?" : "Deshabilitar  Clima?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
       this._climaService.Edit(id,{estado:!estado}).subscribe((result)=>{
        this._notificacion.showNotification('El clima ah sido actualizado','success');
        this.getClimas();
       })
      }
    });
  }
  guardarClima() {
    if (this.climaSeleccionado === undefined) {
      this._climaService
        .Save(this.climaForm.value)
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El clima a sido agregado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getClimas();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    } else {
      this._climaService
        .Edit(
          this.climaSeleccionado.id,
          this.climaForm.value
        )
        .subscribe(
          (result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El clima a sido actualizado correctamente",
                "success"
              );
              this.cerrarModal();
              this.getClimas();
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
