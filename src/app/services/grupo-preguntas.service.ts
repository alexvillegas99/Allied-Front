import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoPreguntas } from 'app/models/grupo-pregunta.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GrupoPreguntasService {

  constructor(private http: HttpClient) { 
  }
  Get(): Observable<GrupoPreguntas[]>{
    let options = this.createRequestOptions();
    return this.http.get<GrupoPreguntas[]>(`${environment.api_URL}/grupoPreguntas`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<GrupoPreguntas>(`${environment.api_URL}/grupoPreguntas/${id}`);
  }
  Save(grupoPreguntas:GrupoPreguntas): any{
    let options = this.createRequestOptions();
     return this.http.post<GrupoPreguntas>(`${environment.api_URL}/grupoPreguntas`,grupoPreguntas,{ headers: options });
     
  }
  Edit(id:number,grupoPreguntas:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/grupoPreguntas/${id}`, grupoPreguntas,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<GrupoPreguntas>(`${environment.api_URL}/grupoPreguntas/${id}`,{ headers: options });
 }
 private createRequestOptions() {
  let token = localStorage.getItem('token');
  let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "auth": token
  });
  return headers;
}
}
