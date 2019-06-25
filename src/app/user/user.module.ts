import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from './../material/material.module';
import { UserRegistrosComponent } from './user-registros/user-registros.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserComponent, UserRegistrosComponent],
  providers: [UserService]
})
export class UserModule { }
