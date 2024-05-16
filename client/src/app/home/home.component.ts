import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private apiService = inject(ApiService);
  campsites: any[] = [];

  ngOnInit() {
    this.getCampsites();
  }

  getCampsites() {
    this.apiService.getCampsites().subscribe(
      (campsites) => {
        this.campsites = campsites;
      },
      (error) => {
        console.error('Error fetching campsites:', error);
      }
    );
  }
}