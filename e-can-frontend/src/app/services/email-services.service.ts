import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailServicesService {
  private emailEndpoint = 'http://localhost:3000/sendEmail'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  sendEmail(dataForms: any) {
    return this.http.post(this.emailEndpoint, dataForms);
  }
}
