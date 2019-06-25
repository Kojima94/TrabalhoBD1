import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionsComponent } from './actions/actions.component';
import { RegistrosvcService } from './registrosvc.service';
import { ModalRegistroComponent } from './modal-registro/modal-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, ActionsComponent, ModalRegistroComponent],
  imports: [
    CommonModule,
    RegistrosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RegistrosvcService
  ],
  entryComponents: [
    ModalRegistroComponent
  ]
})
export class RegistrosModule { }
