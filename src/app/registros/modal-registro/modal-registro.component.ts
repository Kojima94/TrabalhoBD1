import { prefixo } from './../models/url';
import { Registro } from './../models/registros.dto';
import { RegistrosvcService } from './../registrosvc.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Extra } from '../models/extra.dto';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})

export class ModalRegistroComponent implements OnInit {

  justificativa: string;
  dataini: string;
  datafim: string;
  inicio: string;
  fim: string;
  documento: string;

  constructor(public dialogRef: MatDialogRef<ModalRegistroComponent>, public svc: RegistrosvcService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  registrar() {
    if (this.svc.tiporegistro === 'Extra') {
      this.enviarExtra();
    } else {
      this.enviarRegistro();
    }
  }

  enviarRegistro() {
    const json: Registro = {
      data: new Date().toLocaleDateString('en-US'),
      hora: new Date().toLocaleTimeString('pt-BR'),
      justificativa: this.justificativa,
      tiporeg: this.svc.tiporegistro
    };

    this.svc.enviarRegistro(prefixo, json).subscribe(res => {
      console.log(res);
      this.snackBar.open(`${res}`, 'Ok', {
        duration: 10000
      });
    });
    this.dialogRef.close();
  }

  enviarExtra() {
    const json: Extra = {
      documento: this.documento,
      dataini: this.svc.reorderString(this.dataini),
      datafim: this.svc.reorderString(this.datafim),
      inicio: this.inicio,
      fim: this.fim,
      justificativa: this.justificativa
    };

    this.svc.enviarExtra(prefixo, json).subscribe(res => {
      const response: any = res;
      this.snackBar.open(`${response.msg}`, 'Ok', {
        duration: 10000
      });
    });
    this.dialogRef.close();
  }

}
