import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  isLoggedIn = false;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      this.loadReservations();
    }else{
      this.router.navigate(['/sign-in']);
    }
  }

  loadReservations() {

    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token!);
    const userId = decodedToken.userId;
    
    this.apiService.getReservations(userId).subscribe(
      (reservations) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }
}