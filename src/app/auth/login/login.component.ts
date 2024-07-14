import { Component, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../shared/services/alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginRequest, LoginSuccess } from '../model/auth.model';
import { ErrorResponse, MessageResponse } from '../../core/model/failed.model';
import { SuccessResponse } from '../../core/model/success.model';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  homeComponentPath: string = '/home/dashboard';
  registerComponentPath: string = '/auth/register';

  constructor(
    private alert: AlertService,
    private authService: AuthService,
    private formGroup: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}

  // Login
  isLoding: boolean = false;
  errors: string[] = [];

  loginForm: FormGroup = this.formGroup.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(100)],
    ],
  });

  async login() {
    this.isLoding = true;

    const loginFormValue = this.loginForm.value;

    const loginData: LoginRequest = {
      username: loginFormValue.username,
      password: loginFormValue.password,
    };

    try {
      const result:
        | SuccessResponse<LoginSuccess>
        | ErrorResponse<MessageResponse> = await this.authService.login(
        loginData
      );

      if ('data' in result) {
        const successResponse = result as SuccessResponse<LoginSuccess>;

        await this.storage.setToken(successResponse.data.token);

        this.router.navigateByUrl(this.homeComponentPath);

        this.alert.showToast({
          icon: 'success',
          title: 'Login successfull',
        });
      } else if ('errors' in result) {
        const errorResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorResponse.errors.message,
        });
      }

      this.isLoding = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.isLoding = false;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });
    }
  }
}
