import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrosvcService {

  time: any = new Date().toLocaleTimeString('pt-BR');
  day = new Date().toLocaleDateString('pt-BR');
  tiporegistro: string;

  constructor(public router: Router, public http: HttpClient) { }

  updateTime() {
    setInterval( () => {
      this.time = new Date().toLocaleTimeString('pt-BR');
      this.day = new Date().toLocaleDateString('pt-BR');
    }, 1000);
  }

  enviarRegistro(prefixo, registro) {

    const params = new HttpParams()
    .append('data', registro.data)
    .append('hora', registro.hora)
    .append('tiporeg', registro.tiporeg);

    console.log(params);

    return this.http.post(prefixo + 'registro', params, {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  enviarExtra(prefixo, extra) {

    const params = new HttpParams()
    .append('documento', extra.documento)
    .append('dataini', extra.dataini)
    .append('datafim', extra.datafim)
    .append('inicio', extra.inicio)
    .append('fim', extra.fim)
    .append('justificativa', extra.justificativa || null);

    return this.http.post(prefixo + 'extra', params, {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });

  }
  reorderString(str) {
    const dd = str.slice(0, 3);
    const mm = str.slice(3, 6);
    const aa = str.slice(6, 10);

    return mm + dd + aa;
  }

}
