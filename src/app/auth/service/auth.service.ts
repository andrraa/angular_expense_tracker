import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../../../environments/environment.dev';
import {
  LoginRequest,
  LoginSuccess,
  RegisterFailed,
  RegisterRequest,
  UserSuccess,
} from '../model/auth.model';
import { SuccessResponse } from '../../core/model/success.model';
import { ErrorResponse, MessageResponse } from '../../core/model/failed.model';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE_URL: string = Environments.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Login
  public async login(
    request: LoginRequest
  ): Promise<SuccessResponse<LoginSuccess> | ErrorResponse<MessageResponse>> {
    const loginUrl: string = this.API_BASE_URL + '/users/login';

    try {
      const response = await firstValueFrom(
        this.http.post<SuccessResponse<LoginSuccess>>(loginUrl, request).pipe(
          map((response: SuccessResponse<LoginSuccess>) => {
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

  // Register
  public async register(
    request: RegisterRequest
  ): Promise<
    | SuccessResponse<UserSuccess>
    | ErrorResponse<RegisterFailed>
    | ErrorResponse<MessageResponse>
  > {
    const registerUrl: string = this.API_BASE_URL + '/users/register';

    try {
      const response = await firstValueFrom(
        this.http.post<SuccessResponse<UserSuccess>>(registerUrl, request).pipe(
          map((response: SuccessResponse<UserSuccess>) => {
            return response;
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ErrorResponse<RegisterFailed> = {
              errors: {
                full_name: error.error.errors.full_name,
                email: error.error.errors.email,
                username: error.error.errors.username,
                password: error.error.errors.password,
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

  // Logout
  public async logout() {
    const logoutUrl: string = this.API_BASE_URL + '/users/logout';

    try {
      const response = await firstValueFrom(
        this.http.delete(logoutUrl).pipe(
          map(() => {
            return null;
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

  // Profile
  public async profile(): Promise<
    SuccessResponse<UserSuccess> | ErrorResponse<MessageResponse>
  > {
    const profileUrl: string = this.API_BASE_URL + '/users/profile';

    try {
      const response = await firstValueFrom(
        this.http.get<SuccessResponse<UserSuccess>>(profileUrl).pipe(
          map((response: SuccessResponse<UserSuccess>) => {
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
