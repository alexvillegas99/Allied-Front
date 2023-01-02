import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacaCamion } from 'app/models/placa-camion.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacasCamionesService {

  constructor(private http: HttpClient) { 
  }
  Get(): Observable<PlacaCamion[]>{
    let options = this.createRequestOptions();
    return this.http.get<PlacaCamion[]>(`${environment.api_URL}/placasCamiones`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<PlacaCamion>(`${environment.api_URL}/placasCamiones/${id}`);
  }
  Save(placaCamion:PlacaCamion): any{
    let options = this.createRequestOptions();
     return this.http.post<PlacaCamion>(`${environment.api_URL}/placasCamiones`,placaCamion,{ headers: options });
     
  }
  Edit(id:number,placaCamion:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/placasCamiones/${id}`, placaCamion,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<PlacaCamion>(`${environment.api_URL}/placasCamiones/${id}`,{ headers: options });
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
