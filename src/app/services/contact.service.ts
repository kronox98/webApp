import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

const apiEmail = environment.mailUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(datos) {

    const headers = new HttpHeaders({
      'Content-Type': 'text/html; charset=utf-8'
    });

    return this.http.post(`${apiEmail}?dest=${datos.email}&nombre=${ datos.nombre }&asunto=${ datos.asunto }&mensaje=${ datos.mensaje }`,  { headers });

  }
}
