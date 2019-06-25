import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-externos',
  templateUrl: './criar-externos.component.html',
  styleUrls: ['./criar-externos.component.css']
})
export class CriarExternosComponent implements OnInit {

  externoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CriarExternosComponent>,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data,
              public adm: AdminService, public fb: FormBuilder) { }

  ngOnInit() {
    this.externoForm = this.fb.group({
      nomeInput: ['', Validators.required],
      documentoInput: ['', Validators.required],
      contatoInput: ['', Validators.required]
    });
  }

  validarExterno() {
    if (this.externoForm.invalid) {
      this.snackBar.open('Erro! Preencha todos os campos e tente novamente.', 'Ok', {
        duration: 10000
      });
    } else {
      this.addExterno();
    }
  }

  addExterno() {
    this.adm.addExterno(prefixo, this.externoForm.value).subscribe(res => {
      const response: any = res;
      this.snackBar.open('Cadastro feito com sucesso!', 'Ok', {
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
