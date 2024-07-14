import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { AlertService } from '../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage/storage.service';
import { ErrorResponse, MessageResponse } from '../core/model/failed.model';
import { SuccessResponse } from '../core/model/success.model';
import { UserSuccess } from '../auth/model/auth.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  loginComponentPath: string = '/auth/login';

  constructor(
    private alert: AlertService,
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) {
    this.profile();
  }

  // Profile
  public async profile() {
    try {
      const result:
        | SuccessResponse<UserSuccess>
        | ErrorResponse<MessageResponse> = await this.authService.profile();

      if ('data' in result) {
        const userData = result as SuccessResponse<UserSuccess>;

        console.log(userData.data);
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });
    }
  }

  // Logout
  public async logout() {
    try {
      const result = await this.authService.logout();

      if (result == null) {
        this.router.navigateByUrl('/auth/login');
        this.storage.removeToken();

        this.alert.showToast({
          icon: 'success',
          title: 'Logout successfull',
        });
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });
    }
  }
}
