import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-externos',
  templateUrl: './delete-externos.component.html',
  styleUrls: ['./delete-externos.component.css']
})
export class DeleteExternosComponent implements OnInit {

  motivo: string = null;

  constructor(public dialogRef: MatDialogRef<DeleteExternosComponent>,
              public snackBar: MatSnackBar, public adm: AdminService,
              @Inject (MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  deleteExterno(documento) {
    this.adm.apagarExterno(prefixo, documento).subscribe(res => {
      const response: any = res;
      this.snackBar.open(response.msg, 'Ok', {
        duration: 10000
      });
      this.dialogRef.close();
    });
  }

}
