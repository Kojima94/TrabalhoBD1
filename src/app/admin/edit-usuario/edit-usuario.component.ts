import { AdminService } from './../admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { prefixo } from '../../registros/models/url';
import { Registro } from '../../registros/models/registros.dto';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  senha: string;
  usuarioForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUsuarioComponent>,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data,
              public adm: AdminService, public fb: FormBuilder) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nomeInput: [this.data.nome, Validators.required],
      usuarioInput: [this.data.login, Validators.required],
      roleSelect: [this.data.role, Validators.required],
      cargaHrInput: [this.data.cargahr, Validators.required],
      senhaInput: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  atualizarUsuario(form) {
    const json = {
      ctps: this.data.ctps,
      nome: form.nomeInput,
      login: form.usuarioInput,
      role: form.roleSelect,
      cargahr: form.cargaHrInput,
      senha: form.senhaInput
    };

    this.adm.atualizarUsuario(prefixo, json).subscribe(res => {
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
