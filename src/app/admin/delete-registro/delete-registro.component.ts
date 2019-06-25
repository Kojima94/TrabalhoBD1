import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { Registro } from '../../registros/models/registros.dto';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-registro',
  templateUrl: './delete-registro.component.html',
  styleUrls: ['./delete-registro.component.css']
})

export class DeleteRegistroComponent implements OnInit {

  motivo: string = null;

  constructor(public dialogRef: MatDialogRef<DeleteRegistroComponent>,
              public snackBar: MatSnackBar, public adm: AdminService,
              @Inject (MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  deleteRegistro(ctps) {
    this.adm.apagarRegistro(prefixo, ctps).subscribe(res => {
      const response: any = res;
      this.snackBar.open(response.msg, 'Ok', {
        duration: 10000
      });
      this.dialogRef.close();
    });
  }

}
