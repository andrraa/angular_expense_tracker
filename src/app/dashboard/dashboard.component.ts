import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { AlertService } from '../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage/storage.service';
import { ErrorResponse, MessageResponse } from '../core/model/failed.model';
import { SuccessResponse } from '../core/model/success.model';
import { UserSuccess } from '../auth/model/auth.model';
import { ExpenseService } from '../shared/services/expense/expense.service';
import {
  ExpenseSuccess,
  ExpenseTotal,
} from '../shared/models/expense/expense.model';

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
    private expenseService: ExpenseService,
    private router: Router,
    private storage: StorageService
  ) {
    this.profile();
    this.expenses();
    this.totalExpense();
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
  isLoadingProfile: boolean = false;

  public async profile() {
    this.isLoadingProfile = true;

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

      this.isLoadingProfile = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isLoadingProfile = false;
    }
  }

  // Expenses
  expensesData: ExpenseSuccess[] = [];

  isLoadingExpenses: boolean = false;

  public async expenses() {
    try {
      const result:
        | SuccessResponse<ExpenseSuccess[]>
        | ErrorResponse<MessageResponse> = await this.expenseService.expenses();

      if ('data' in result) {
        this.expensesData = result.data;
      }

      if ('errors' in result) {
        const errorResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorResponse.errors.message,
        });
      }

      this.isLoadingExpenses = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isLoadingExpenses = false;
    }
  }

  // Expense Total
  expenseTotalData: ExpenseTotal = {
    total_income: '',
    total_outcome: '',
  };

  isLoadingTotalExpense: boolean = false;

  public async totalExpense() {
    this.isLoadingTotalExpense = true;

    try {
      const result:
        | SuccessResponse<ExpenseTotal>
        | ErrorResponse<MessageResponse> =
        await this.expenseService.totalExpense();

      if ('data' in result) {
        this.expenseTotalData = result.data;
        console.log(this.expenseTotalData);
      }

      if ('errors' in result) {
        const errorResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorResponse.errors.message,
        });
      }

      this.isLoadingTotalExpense = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isLoadingTotalExpense = false;
    }
  }

  // Delete Expense
  isDeletingExpense: boolean = false;

  public async delete(id: number) {
    this.isDeletingExpense = true;

    try {
      const result = await this.expenseService.delete(id);

      if (result) {
        this.expenses();
        this.totalExpense();
      }

      this.isDeletingExpense = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isDeletingExpense = false;
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
