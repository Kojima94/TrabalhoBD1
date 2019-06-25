import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {

  motivo: string = null;

  constructor(public dialogRef: MatDialogRef<DeleteUsuarioComponent>,
              public snackBar: MatSnackBar, public adm: AdminService,
              @Inject (MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  deleteUsuario(ctps) {
    this.adm.apagarUsuario(prefixo, ctps).subscribe(res => {
      const response: any = res;
      this.snackBar.open(response.msg, 'Ok', {
        duration: 10000
      });
      this.dialogRef.close();
    });
  }

}
