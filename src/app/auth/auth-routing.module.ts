import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MasterAuthComponent } from './master-auth/master-auth.component';
import { authGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MasterAuthComponent,
    canActivate: [authGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Account' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Account',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
