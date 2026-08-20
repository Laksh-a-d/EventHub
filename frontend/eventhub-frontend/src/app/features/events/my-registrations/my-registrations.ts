import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  RegistrationService,
  RegistrationResponse
} from '../../../core/services/registration';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-my-registrations',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './my-registrations.html',
  styleUrl: './my-registrations.css'
})
export class MyRegistrations implements OnInit {

  registrations: RegistrationResponse[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.changeDetectorRef.detectChanges();

    this.registrationService.getMyRegistrations().subscribe({
      next: (data: RegistrationResponse[]) => {
        this.registrations = data ?? [];
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 401) {
          this.errorMessage = 'Please log in to view your registrations.';
        } else if (error?.status === 403) {
          this.errorMessage = 'You do not have permission to view this resource.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load your registrations. Please try again.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  cancelRegistration(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const confirmed = confirm('Are you sure you want to cancel this registration?');
    if (!confirmed) {
      return;
    }

    this.registrationService.deleteRegistration(id).subscribe({
      next: () => {
        this.successMessage = 'Registration cancelled successfully.';
        this.loadRegistrations();
        setTimeout(() => {
          this.successMessage = '';
          this.changeDetectorRef.detectChanges();
        }, 3000);
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Unable to cancel registration. Please try again.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  browseEvents(): void {
    this.router.navigate(['/events']);
  }
}