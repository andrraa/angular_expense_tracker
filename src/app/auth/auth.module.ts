import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../shared/components/button/button.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MasterAuthComponent } from './master-auth/master-auth.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LoginComponent,
    RegisterComponent,
    MasterAuthComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
