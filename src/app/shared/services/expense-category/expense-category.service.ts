import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../../../../environments/environment.dev';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import {
  CreateCategoryRequest,
  CreateCategorySuccess,
} from '../../models/expense-type/expense-type.model';
import { SuccessResponse } from '../../../core/model/success.model';
import {
  ErrorResponse,
  MessageResponse,
} from '../../../core/model/failed.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService {
  private readonly API_BASE_URL: string = Environments.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Create
  async create(
    request: CreateCategoryRequest
  ): Promise<
    SuccessResponse<CreateCategorySuccess> | ErrorResponse<MessageResponse>
  > {
    const createCategoryUrl = this.API_BASE_URL + '/categories/create';

    try {
      const response = await firstValueFrom(
        this.http
          .post<SuccessResponse<CreateCategorySuccess>>(
            createCategoryUrl,
            request
          )
          .pipe(
            map((response: SuccessResponse<CreateCategorySuccess>) => {
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
