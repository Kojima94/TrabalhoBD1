import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { Registro } from '../../registros/models/registros.dto';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CriarUsuarioComponent>,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data,
              public adm: AdminService, public fb: FormBuilder) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nomeInput: ['', Validators.required],
      ctpsInput: ['', Validators.required],
      usuarioInput: ['', Validators.required],
      roleSelect: ['', Validators.required],
      cargaHrInput: ['', Validators.required],
      senhaInput: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  validarUsuario() {
    if (this.usuarioForm.invalid) {
      this.snackBar.open('Erro! Preencha todos os campos e tente novamente.', 'Ok', {
        duration: 10000
      });
    } else {
      this.addUsuario();
    }
  }

  addUsuario() {

    this.adm.addUsuario(prefixo, this.usuarioForm.value).subscribe(res => {
      const response: any = res;
    }, error => {
      this.snackBar.open('Ops! Algo deu errado.', 'Ok', {
        duration: 10000
      });
    });
    this.dialogRef.close();
  }

}
