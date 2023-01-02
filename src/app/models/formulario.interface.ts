export interface Formulario{
    titulo:string;
    descripcion:string;
    tipo_formulario:string;
    proceso:string;
    formulario_referenciado?:string;
    grupos_preguntas?:grupoPreguntas[];
}
export interface grupoPreguntas{
    titulo:string;
    preguntas?:preguntas[]
}
export interface preguntas{
    titulo:string;
    tipo_pregunta:string;
    escala_lineal?:escalaLineal[];
    varias_opciones?:variasOpciones[]
    obligatoria:boolean
}
export interface variasOpciones{
    opcion:string;
}
export interface escalaLineal{
    etiqueta:string;
}
