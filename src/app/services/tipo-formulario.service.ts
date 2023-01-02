import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoFormulario } from 'app/models/tipo-formulario.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TipoFormularioService {

  
  constructor(private http: HttpClient) { 
  }
  Get(): Observable<TipoFormulario[]>{
    let options = this.createRequestOptions();
    return this.http.get<TipoFormulario[]>(`${environment.api_URL}/tipoFormulario`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<TipoFormulario>(`${environment.api_URL}/tipoFormulario/${id}`);
  }
  Save(tipoFormulario:TipoFormulario): any{
    let options = this.createRequestOptions();
     return this.http.post<TipoFormulario>(`${environment.api_URL}/tipoFormulario`,tipoFormulario,{ headers: options });
     
  }
  Edit(id:number,tipoFormulario:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/tipoFormulario/${id}`, tipoFormulario,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<TipoFormulario>(`${environment.api_URL}/tipoFormulario/${id}`,{ headers: options });
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
