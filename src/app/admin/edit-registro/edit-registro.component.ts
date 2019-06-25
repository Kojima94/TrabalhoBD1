import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { Registro } from '../../registros/models/registros.dto';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { RegistrosvcService } from 'src/app/registros/registrosvc.service';

export interface DialogData {
  id: string;
  dia: string;
  hora: string;
  tipo: string;
}

@Component({
  selector: 'app-edit-registro',
  templateUrl: './edit-registro.component.html',
  styleUrls: ['./edit-registro.component.css']
})

export class EditRegistroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditRegistroComponent>,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public adm: AdminService, public svc: RegistrosvcService) { }

  ngOnInit() {
  }

  atualizarRegistro(rctps, rdata, rhora, rtipo) {
    const json = {
      ctps: rctps,
      data: this.svc.reorderString(rdata),
      hora: rhora,
      tipo: rtipo
    };

    this.adm.atualizarRegistro(prefixo, json).subscribe(res => {
      const response: any = res;
      this.snackBar.open(response.msg, 'Ok', {
        duration: 10000
      });
    }, error => {
      this.snackBar.open('Ops! Algo deu errado.', 'Ok', {
        duration: 10000
      });
    });
    this.dialogRef.close();
  }

}
