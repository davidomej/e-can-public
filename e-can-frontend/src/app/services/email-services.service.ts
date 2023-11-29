import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailServicesService {
  private emailEndpoint = environment.apiEmail; 

  constructor(private http: HttpClient) {}

  sendEmail(dataForms: any) {
    return this.http.post(this.emailEndpoint, dataForms);
  }
}
