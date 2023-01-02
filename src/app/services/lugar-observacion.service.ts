import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LugarObservacion } from 'app/models/lugar-observacion.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LugarObservacionService {

  constructor(private http: HttpClient) { 
  }
  Get(): Observable<LugarObservacion[]>{
    let options = this.createRequestOptions();
    return this.http.get<LugarObservacion[]>(`${environment.api_URL}/lugarObservacion`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<LugarObservacion>(`${environment.api_URL}/lugarObservacion/${id}`);
  }
  Save(lugarObservacion:LugarObservacion): any{
    let options = this.createRequestOptions();
     return this.http.post<LugarObservacion>(`${environment.api_URL}/lugarObservacion`,lugarObservacion,{ headers: options });
     
  }
  Edit(id:number,lugarObservacion:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/lugarObservacion/${id}`, lugarObservacion,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<LugarObservacion>(`${environment.api_URL}/lugarObservacion/${id}`,{ headers: options });
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
