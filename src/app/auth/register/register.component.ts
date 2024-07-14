import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RegisterFailed,
  RegisterRequest,
  UserSuccess,
} from '../model/auth.model';
import { SuccessResponse } from '../../core/model/success.model';
import { AuthService } from '../service/auth.service';
import { ErrorResponse, MessageResponse } from '../../core/model/failed.model';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  loginComponentPath: string = '/auth/login';

  constructor(
    private alert: AlertService,
    private authService: AuthService,
    private formGroup: FormBuilder,
    private router: Router
  ) {}

  // Register
  isRegistering: boolean = false;
  isFormError: boolean = false;
  errors: string[] = [];

  registerForm: FormGroup = this.formGroup.group({
    full_name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async register() {
    this.isRegistering = true;
    this.isFormError = false;

    const registerFormValue = this.registerForm.value;

    const registerData: RegisterRequest = {
      full_name: registerFormValue.full_name,
      username: registerFormValue.username,
      email: registerFormValue.email,
      password: registerFormValue.password,
    };

    try {
      const result:
        | SuccessResponse<UserSuccess>
        | ErrorResponse<MessageResponse>
        | ErrorResponse<RegisterFailed> = await this.authService.register(
        registerData
      );

      if ('data' in result) {
        this.router.navigateByUrl(this.loginComponentPath);
        this.alert.showToast({
          icon: 'success',
          title: 'Register account successful',
        });
      }

      if ('errors' in result) {
        const errorResponse = result as ErrorResponse<RegisterFailed>;

        this.errors = this.errorCollectors(errorResponse.errors);

        this.isFormError = true;

        this.alert.showToast({
          icon: 'error',
          title: 'Register account failed',
        });
      }

      this.isRegistering = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.isRegistering = false;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });
    }
  }

  private errorCollectors(errors: RegisterFailed): string[] {
    const errorMessages: string[] = [];

    if (errors.full_name) {
      errorMessages.push(...errors.full_name);
    }

    if (errors.email) {
      errorMessages.push(...errors.email);
    }

    if (errors.username) {
      errorMessages.push(...errors.username);
    }

    if (errors.password) {
      errorMessages.push(...errors.password);
    }

    return errorMessages;
  }
}
