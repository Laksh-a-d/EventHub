import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.isLoading = true;

    this.auth.login(
      this.email,
      this.password
    ).subscribe({

      next: (response) => {

        console.log('Login successful');
        console.log('Login response:', response);

        this.isLoading = false;

        if (response?.token) {
          console.log('JWT received');
          console.log('Token:', response.token);
        }

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        console.error('Login failed:', error);

        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password.';
      }

    });
  }
}