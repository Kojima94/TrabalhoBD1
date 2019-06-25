import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../app/login/login.module#LoginModule',
  },
  {
    path: 'registro',
    loadChildren: '../app/registros/registros.module#RegistrosModule',
  },
  {
    path: 'admin',
    loadChildren: '../app/admin/admin.module#AdminModule',
  },
  {
    path: 'user',
    loadChildren: '../app/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
