import { TabelaExtrasComponent } from './tabela-extras/tabela-extras.component';
import { PainelAdminComponent } from './painel-admin/painel-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaRegistrosComponent } from './tabela-registros/tabela-registros.component';
import { TabelaUsuariosComponent } from './tabela-usuarios/tabela-usuarios.component';
import { TabelaExternosComponent } from './tabela-externos/tabela-externos.component';

const routes: Routes = [
  {
    path: '',
    component: PainelAdminComponent,
    children: [
      {
        path: '',
        component: TabelaRegistrosComponent
      },
      {
        path: 'usuarios',
        component: TabelaUsuariosComponent
      },
      {
        path: 'extras',
        component: TabelaExtrasComponent
      },
      {
        path: 'externos',
        component: TabelaExternosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
