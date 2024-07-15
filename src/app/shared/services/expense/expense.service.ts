import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../../../../environments/environment.dev';
import {
  ErrorResponse,
  MessageResponse,
} from '../../../core/model/failed.model';
import { SuccessResponse } from '../../../core/model/success.model';
import {
  CreateExpenseRequest,
  ExpenseSuccess,
  ExpenseTotal,
  ExpenseTypeSuccess,
} from '../../models/expense/expense.model';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly API_BASE_URL: string = Environments.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Expenses
  async expenses(): Promise<
    SuccessResponse<ExpenseSuccess[]> | ErrorResponse<MessageResponse>
  > {
    const expensesUrl: string = this.API_BASE_URL + '/expenses';

    try {
      const response = await firstValueFrom(
        this.http.get<SuccessResponse<ExpenseSuccess[]>>(expensesUrl).pipe(
          map((response: SuccessResponse<ExpenseSuccess[]>) => {
            return response;
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ErrorResponse<MessageResponse> = {
              errors: {
                message: error.error.errors.message,
              },
            };

            return throwError(() => errorResponse);
          })
        )
      );

      return response;
    } catch (error) {
      return error as ErrorResponse<MessageResponse>;
    }
  }

  // Create
  async create(
    request: CreateExpenseRequest
  ): Promise<SuccessResponse<ExpenseSuccess> | ErrorResponse<MessageResponse>> {
    const createExpenseUrl: string = this.API_BASE_URL + '/expenses/create';

    try {
      const resposne = await firstValueFrom(
        this.http
          .post<SuccessResponse<ExpenseSuccess>>(createExpenseUrl, request)
          .pipe(
            map((response: SuccessResponse<ExpenseSuccess>) => {
              return response;
            }),
            catchError((error: HttpErrorResponse) => {
              const errorResponse: ErrorResponse<MessageResponse> = {
                errors: {
                  message: error.error.errors.message,
                },
              };

              return throwError(() => errorResponse);
            })
          )
      );

      return resposne;
    } catch (error) {
      return error as ErrorResponse<MessageResponse>;
    }
  }

  // Get expense types
  async expenseTypes(): Promise<
    SuccessResponse<ExpenseTypeSuccess[]> | ErrorResponse<MessageResponse>
  > {
    const expenseTypeUrl: string = this.API_BASE_URL + '/expenses/types';

    try {
      const response = await firstValueFrom(
        this.http
          .get<SuccessResponse<ExpenseTypeSuccess[]>>(expenseTypeUrl)
          .pipe(
            map((response: SuccessResponse<ExpenseTypeSuccess[]>) => {
              return response;
            }),
            catchError((error: HttpErrorResponse) => {
              const errorResponse: ErrorResponse<MessageResponse> = {
                errors: {
                  message: error.error.errors.message,
                },
              };

              return throwError(() => errorResponse);
            })
          )
      );

      return response;
    } catch (error) {
      return error as ErrorResponse<MessageResponse>;
    }
  }

  // Get total expense
  async totalExpense(): Promise<
    SuccessResponse<ExpenseTotal> | ErrorResponse<MessageResponse>
  > {
    const totalExpenseUrl: string = this.API_BASE_URL + '/datas/total';

    try {
      const response = await firstValueFrom(
        this.http.get<SuccessResponse<ExpenseTotal>>(totalExpenseUrl).pipe(
          map((response: SuccessResponse<ExpenseTotal>) => {
            return response;
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ErrorResponse<MessageResponse> = {
              errors: {
                message: error.error.errors.message,
              },
            };

            return throwError(() => errorResponse);
          })
        )
      );

      return response;
    } catch (error) {
      return error as ErrorResponse<MessageResponse>;
    }
  }

  // Delete Expense
  async delete(id: number): Promise<boolean | ErrorResponse<MessageResponse>> {
    const deleteUrl: string = this.API_BASE_URL + '/expenses/delete/' + id;

    try {
      const response = await firstValueFrom(
        this.http.delete<boolean>(deleteUrl).pipe(
          map(() => {
            return true;
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ErrorResponse<MessageResponse> = {
              errors: {
                message: error.error.errors.message,
              },
            };

            return throwError(() => errorResponse);
          })
        )
      );

      return response;
    } catch (error) {
      return error as ErrorResponse<MessageResponse>;
    }
  }
}
