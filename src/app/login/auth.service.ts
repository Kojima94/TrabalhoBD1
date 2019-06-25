import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { prefixo } from './../registros/models/url';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRole = '';

  constructor(public router: Router, public snackBar: MatSnackBar, public http: HttpClient) { }

  efetuarLogin(login, senha) {

    const params = new HttpParams()
    .set('login', login)
    .set('senha', senha);

    this.http.get(prefixo + 'login', {params}).subscribe(res => {
      console.log(res);
      const response: any = res;
      if (response[0].msg === 'OK') {
        sessionStorage.setItem('token', response[0].token);
        sessionStorage.setItem('role', response[0].dataAuth.role);
        this.snackBar.open('Você entrou no app', 'Ok', {
          duration: 10000
        });
        this.router.navigate(['registro']);
      } else {
        this.snackBar.open('Usuário e senha não encontrados, cheque seus dados e tente novamente.', 'Ok', {
          duration: 10000
        });
      }
    }, error => {
      if (error) {
        this.snackBar.open('Sem resposta do servidor, tente novamente mais tarde.', 'Ok', {
          duration: 10000
        });
      }
    });
  }

  checkGuard() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
