import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Save Token
  public setToken(token: string): void {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.setItem('token', token);
    }
  }

  // Get Token
  public getToken(name: string): string | null {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      return sessionStorage.getItem(name);
    }
    return null;
  }

  // Remove Token
  public removeToken(): void {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.clear();
    }
  }
}
