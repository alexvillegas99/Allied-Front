import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clima } from 'app/models/clima.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  constructor(private http: HttpClient) { 
  }
  Get(): Observable<Clima[]>{
    let options = this.createRequestOptions();
    return this.http.get<Clima[]>(`${environment.api_URL}/clima`,{ headers: options });

  }
  getID(id: string) {
    return this.http.get<Clima>(`${environment.api_URL}/clima/${id}`);
  }
  Save(clima:Clima): any{
    let options = this.createRequestOptions();
     return this.http.post<Clima>(`${environment.api_URL}/clima`,clima,{ headers: options });
     
  }
  Edit(id:number,rol:any): any {
    let options = this.createRequestOptions();
    return this.http.put(`${environment.api_URL}/clima/${id}`, rol,{ headers: options });
  }
  Delete(id:number): any{
    let options = this.createRequestOptions();
    return this.http.delete<Clima>(`${environment.api_URL}/clima/${id}`,{ headers: options });
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
