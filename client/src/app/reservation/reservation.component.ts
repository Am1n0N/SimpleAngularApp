import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
 
})
export class ReservationComponent {
  @Input() campsite: any;
  @Output() reservationMade = new EventEmitter<void>();

  reservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.reservationForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const { startDate, endDate } = this.reservationForm.value;
      
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token!);
      const userId = decodedToken.userId;


      this.apiService
        .createReservation(userId, this.campsite.id, startDate, endDate)
        .subscribe(
          () => {
            console.log('Reservation created successfully');
            this.reservationMade.emit();
            this.reservationForm.reset();
          },
          (error) => {
            console.error('Error creating reservation:', error);
          }
        );
    }
  }
}