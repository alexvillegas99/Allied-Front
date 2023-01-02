import { Component, OnInit } from '@angular/core';
import { Formulario } from 'app/models/formulario.interface';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  constructor() { }
nuevoFormulario:Formulario=undefined;
grupoPregunta:string='Seleccione...';
  ngOnInit(): void {
    this.nuevoFormulario = {
      titulo:"",
      descripcion:"",
      tipo_formulario:"Seleccione...",
      proceso:"Seleccione..." ,
      formulario_referenciado:"Seleccione...",
      grupos_preguntas:[
        {
          titulo:'Lugar de trabajo',
          preguntas:[{
            titulo:'',
            tipo_pregunta:"Respuesta corta",
            obligatoria:true,
          }]
        }
      ]
      }
  }
  agregarGrupo(){
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

}
