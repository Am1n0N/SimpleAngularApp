import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-campsite',
  templateUrl: './campsite.component.html',
})
export class CampsiteComponent {
  campsite: any;
  showReservationForm = false;
  isLoggedIn = false;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const campsiteId = parseInt(params.get('id') || '', 10);
      this.getCampsite(campsiteId);
    });
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  getCampsite(campsiteId: number) {
    this.apiService.getCampsite(campsiteId).subscribe(
      (campsite) => {
        this.campsite = campsite;
      },
      (error) => {
        console.error('Error fetching campsite:', error);
      }
    );
  }

  toggleReservationForm() {
    this.showReservationForm = !this.showReservationForm;
  }

  onReservationMade() {
    this.showReservationForm = false;
    // Optionally, you can display a success message or perform additional actions
  }
}
