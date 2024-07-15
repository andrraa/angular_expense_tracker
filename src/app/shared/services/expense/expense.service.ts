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
  ExpenseTypeSuccess,
} from '../../models/expense/expense.model';
import { catchError, first, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly API_BASE_URL: string = Environments.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
}
