import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { prefixo } from '../registros/models/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  buscarRegistrosUser() {
    return this.http.get(prefixo + 'user', {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  buscarPorPeriodo(inicio, fim) {

    let params = new HttpParams();
    // tslint:disable-next-line: curly
    if (inicio) params = params.append('inicio', this.reorderString(inicio));
    // tslint:disable-next-line: curly
    if (fim) params = params.append('fim', this.reorderString(fim));

    return this.http.post(prefixo + 'reguser', params, {
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
