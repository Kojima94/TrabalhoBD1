import { AdminService } from './admin.service';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PainelAdminComponent } from './painel-admin/painel-admin.component';
import { TabelaRegistrosComponent } from './tabela-registros/tabela-registros.component';
import { EditRegistroComponent } from './edit-registro/edit-registro.component';
import { DeleteRegistroComponent } from './delete-registro/delete-registro.component';
import { TabelaUsuariosComponent } from './tabela-usuarios/tabela-usuarios.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabelaExtrasComponent } from './tabela-extras/tabela-extras.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { TabelaExternosComponent } from './tabela-externos/tabela-externos.component';
import { CriarExternosComponent } from './criar-externos/criar-externos.component';
import { DeleteExternosComponent } from './delete-externos/delete-externos.component';

@NgModule({
  declarations: [PainelAdminComponent, TabelaRegistrosComponent, EditRegistroComponent,
    DeleteRegistroComponent, TabelaUsuariosComponent, TabelaExtrasComponent,
    EditUsuarioComponent, DeleteUsuarioComponent, CriarUsuarioComponent,
    TabelaExternosComponent, CriarExternosComponent, DeleteExternosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AdminService
  ],
  entryComponents: [
    EditRegistroComponent,
    EditUsuarioComponent,
    DeleteRegistroComponent,
    DeleteUsuarioComponent,
    CriarUsuarioComponent,
    CriarExternosComponent,
    DeleteExternosComponent
  ]
})
export class AdminModule { }
