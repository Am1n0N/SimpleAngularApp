import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}