import { Component, OnInit } from '@angular/core';
import { Formulario } from 'app/models/formulario.interface';
import { GrupoPreguntas } from 'app/models/grupo-pregunta.interface';
import { Proceso } from 'app/models/proceso.interface';
import { TipoFormulario } from 'app/models/tipo-formulario.interface';
import { GrupoPreguntasService } from 'app/services/grupo-preguntas.service';
import { ProcesosService } from 'app/services/procesos.service';
import { TipoFormularioService } from 'app/services/tipo-formulario.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  //Variables combos
  tipoFormularios:TipoFormulario[]=[];
  procesos:Proceso[]=[];
  grupoPreguntas:GrupoPreguntas[]=[];
  constructor(
    private _tipoFormularioService:TipoFormularioService,
    private _proceService:ProcesosService,
    private _grupoPreguntasService:GrupoPreguntasService
  ) { }
nuevoFormulario:Formulario=undefined;
grupoPregunta:string='';
  ngOnInit(): void {

    this.getTipoFormularios();
    this.getProcesos();
    this.getGrupoPreguntas();




    this.nuevoFormulario = {
      titulo:"",
      descripcion:"",
      tipo_formulario:"Seleccione...",
      proceso:"Seleccione..." ,
      formulario_referenciado:"Seleccione...",
      grupos_preguntas:[
       
      ]
      }
  }
  getProcesos() {
    this._proceService.Get().subscribe(res=>{
      this.procesos=res;
          })
  }
  getTipoFormularios() {
    this._tipoFormularioService.Get().subscribe(res=>{
this.tipoFormularios=res;
    })
  }
  getGrupoPreguntas(){
this._grupoPreguntasService.Get().subscribe(res=>{
  this.grupoPreguntas=res;
  this.grupoPregunta=res[0].nombre;
})
  }
  agregarGrupo(){
    console.log(this.grupoPregunta)
    if(this.grupoPregunta!=''){
    this.nuevoFormulario.grupos_preguntas.push(
      {
        titulo:this.grupoPregunta,
        preguntas:[{
          titulo:'',
          tipo_pregunta:"Seleccione...",
          obligatoria:true,
        }]
      }
    )
  }
  }
  eliminarGrupoPreguntas(index:number){
    this.nuevoFormulario.grupos_preguntas.splice(index, 1);
  }
  agregarPregunta(index:number){

    this.nuevoFormulario.grupos_preguntas[index].preguntas.push({
      titulo:'',
      tipo_pregunta:"Seleccione...",
      obligatoria:true,
    })
  }
  eliminarPregunta(indexG:number,indexP:number){
    this.nuevoFormulario.grupos_preguntas[indexG].preguntas.splice(indexP, 1);
  }
  imprimir(){
    console.log(this.nuevoFormulario.tipo_formulario)
  }

}
