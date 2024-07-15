import { Component, ViewEncapsulation } from '@angular/core';
import { ExpenseCategoryService } from '../../services/expense-category/expense-category.service';
import { AlertService } from '../../services/alert/alert.service';
import { SuccessResponse } from '../../../core/model/success.model';
import { CreateCategorySuccess } from '../../models/expense-type/expense-type.model';
import {
  ErrorResponse,
  MessageResponse,
} from '../../../core/model/failed.model';
import {
  CreateExpenseRequest,
  ExpenseSuccess,
  ExpenseTypeSuccess,
} from '../../models/expense/expense.model';
import { ExpenseService } from '../../services/expense/expense.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-expense',
  templateUrl: './form-expense.component.html',
  styleUrl: './form-expense.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormExpenseComponent {
  constructor(
    private alert: AlertService,
    private categoryService: ExpenseCategoryService,
    private expenseService: ExpenseService,
    private form: FormBuilder
  ) {}

  // Create Expense
  expenseForm: FormGroup = this.form.group({
    type_id: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  isCreatingExpense: boolean = false;

  public async create() {
    this.isCreatingExpense = true;

    const expenseValue = this.expenseForm.value;

    const data: CreateExpenseRequest = {
      type_id: expenseValue.type_id,
      category_id: expenseValue.category_id,
      name: expenseValue.name,
      amount: expenseValue.amount,
    };

    try {
      const result:
        | SuccessResponse<ExpenseSuccess>
        | ErrorResponse<MessageResponse> = await this.expenseService.create(
        data
      );

      console.log(result);

      if ('data' in result) {
        this.alert.showToast({
          icon: 'success',
          title: 'Success create expense',
        });

        this.expenseForm.reset();
      }

      if ('errors' in result) {
        const errorResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorResponse.errors.message,
        });
      }

      this.isCreatingExpense = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isCreatingExpense = false;
    }
  }

  // Categories
  isLoadingCategories: boolean = false;

  categoryData: CreateCategorySuccess[] = [];

  public async categories() {
    this.isLoadingCategories = true;

    try {
      const result:
        | SuccessResponse<CreateCategorySuccess[]>
        | ErrorResponse<MessageResponse> =
        await this.categoryService.categories();

      console.log(result);

      if ('data' in result) {
        const categories = result as SuccessResponse<CreateCategorySuccess[]>;

        this.categoryData = categories.data;
      }

      if ('errors' in result) {
        const errors = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errors.errors.message,
        });
      }

      this.isLoadingCategories = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isLoadingExpenseTypes = false;
    }
  }

  // Expense Types
  isLoadingExpenseTypes: boolean = false;

  expenseTypeData: ExpenseTypeSuccess[] = [];

  public async expenseTypes() {
    this.isLoadingExpenseTypes = true;

    try {
      const result:
        | SuccessResponse<ExpenseTypeSuccess[]>
        | ErrorResponse<MessageResponse> =
        await this.expenseService.expenseTypes();

      if ('data' in result) {
        const response = result as SuccessResponse<ExpenseTypeSuccess[]>;

        this.expenseTypeData = response.data;
      }

      if ('errors' in result) {
        const errorResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorResponse.errors.message,
        });
      }

      this.isLoadingExpenseTypes = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });

      this.isLoadingExpenseTypes = false;
    }
  }
}
