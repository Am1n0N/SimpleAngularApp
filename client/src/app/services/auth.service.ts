import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Method to update authentication state
  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  // Observable to listen to authentication state changes
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setToken(token: string): void {
    this.token = token;
    // Store the token in localStorage or a cookie here
  }

  getToken(): string | null {
    // Retrieve the token from localStorage or a cookie here
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token is not null or undefined
  }
}

