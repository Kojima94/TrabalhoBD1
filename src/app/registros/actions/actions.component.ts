import { ModalRegistroComponent } from './../modal-registro/modal-registro.component';
import { Component, OnInit } from '@angular/core';
import { RegistrosvcService } from '../registrosvc.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(public dialog: MatDialog, public svc: RegistrosvcService,
              public router: Router, public snackBar: MatSnackBar, public auth: AuthService) { }

  ngOnInit() {
  }

  openRegistro(tipo): void {
    const dialogRef = this.dialog.open(ModalRegistroComponent, {
    });

    this.svc.tiporegistro = tipo;

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  efetuarLogout() {
    this.router.navigate(['']);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.snackBar.open('Você saiu do app', 'Ok', {
      duration: 10000
    });
  }

  /* saveForLater() {
    this.http.post(prefixo + 'admin', null, {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }).subscribe(res => {
      console.log(res);
    });
  } */

}
