import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proceso } from 'app/models/proceso.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  
  constructor(private http: HttpClient) { 
  }
  Get(): Observable<Proceso[]>{
    let options = this.createRequestOptions();
    return this.http.get<Proceso[]>(`${environment.api_URL}/procesos`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<Proceso>(`${environment.api_URL}/procesos/${id}`);
  }
  Save(proceso:Proceso): any{
    let options = this.createRequestOptions();
     return this.http.post<Proceso>(`${environment.api_URL}/procesos`,proceso,{ headers: options });
     
  }
  Edit(id:number,proceso:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/procesos/${id}`, proceso,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<Proceso>(`${environment.api_URL}/procesos/${id}`,{ headers: options });
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
