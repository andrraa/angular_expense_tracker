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

  // Loading
  isLoadingCategory: boolean = false;
  isLoadingExpense: boolean = false;

  // Expense / Expense Type
  isShowingExpense: boolean = false;

  toggleExpense(): void {
    this.isShowingExpense = !this.isShowingExpense;
  }

  // Profile
  userFullName: string = '';
  userUsername: string = '';
  userEmail: string = '';

  public async profile() {
    try {
      const result:
        | SuccessResponse<UserSuccess>
        | ErrorResponse<MessageResponse> = await this.authService.profile();

      if ('data' in result) {
        const userData = result as SuccessResponse<UserSuccess>;
        console.log(userData);

        this.userFullName = userData.data.full_name;
        this.userUsername = userData.data.username;
        this.userEmail = userData.data.email;
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
