import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      this.apiService.signUp(name, email, password).subscribe(
        (response) => {
          // Handle successful sign-up
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/sign-in']);
        },
        (error) => {
          // Handle sign-up error
          console.error(error);
        }
      );
    }
  }
}