import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategoryService } from '../../services/expense-category/expense-category.service';
import {
  CreateCategoryRequest,
  CreateCategorySuccess,
} from '../../models/expense-type/expense-type.model';
import {
  ErrorResponse,
  MessageResponse,
} from '../../../core/model/failed.model';
import { AlertService } from '../../services/alert/alert.service';
import { SuccessResponse } from '../../../core/model/success.model';

@Component({
  selector: 'app-form-expense-type',
  templateUrl: './form-expense-type.component.html',
  styleUrl: './form-expense-type.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormExpenseTypeComponent {
  constructor(
    private alert: AlertService,
    private categoryService: ExpenseCategoryService,
    private form: FormBuilder
  ) {}

  // Expense - Categories
  isCreatingCategories: boolean = false;

  ExpenseCategoryForm: FormGroup = this.form.group({
    name: ['', [Validators.required]],
  });

  async create() {
    this.isCreatingCategories = true;

    const categoryValue = this.ExpenseCategoryForm.value;

    const request: CreateCategoryRequest = {
      name: categoryValue.name,
    };

    try {
      const result:
        | SuccessResponse<CreateCategorySuccess>
        | ErrorResponse<MessageResponse> = await this.categoryService.create(
        request
      );

      if ('data' in result) {
        this.ExpenseCategoryForm.reset();

        this.alert.showToast({
          icon: 'success',
          title: 'Success create category',
        });
      }

      if ('errors' in result) {
        const errorsResponse = result as ErrorResponse<MessageResponse>;

        this.alert.showToast({
          icon: 'error',
          title: errorsResponse.errors.message,
        });
      }

      this.isCreatingCategories = false;
    } catch (error) {
      const errorResponse = error as ErrorResponse<MessageResponse>;

      this.isCreatingCategories = false;

      this.alert.showToast({
        icon: 'error',
        title: errorResponse.errors.message,
      });
    }
  }
}
