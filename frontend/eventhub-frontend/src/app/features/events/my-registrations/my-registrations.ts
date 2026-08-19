import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';

import {
  RegistrationService,
  RegistrationResponse
} from '../../../core/services/registration';

import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-my-registrations',
  standalone: true,
  imports: [],
  templateUrl: './my-registrations.html',
  styleUrl: './my-registrations.css'
})
export class MyRegistrations implements OnInit {

  // ==========================================
  // VARIABLES
  // ==========================================

  registrations: RegistrationResponse[] = [];

  isLoading = true;

  errorMessage = '';

  successMessage = '';


  // ==========================================
  // CURRENT USER ID
  // ==========================================

  currentUserId: number | null = null;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private registrationService: RegistrationService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    console.log(
      'MY REGISTRATIONS COMPONENT'
    );


    // Get logged-in user ID from JWT

    this.currentUserId =
      this.authService.getUserId();


    console.log(
      'CURRENT USER ID:',
      this.currentUserId
    );


    // User ID could not be found

    if (this.currentUserId === null) {

      this.errorMessage =
        'Unable to identify logged-in user. Please login again.';

      this.isLoading = false;

      this.changeDetectorRef.detectChanges();

      return;

    }


    this.loadRegistrations();

  }


  // ==========================================
  // LOAD REGISTRATIONS
  // ==========================================

  loadRegistrations(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.successMessage = '';


    this.registrationService
      .getRegistrations()
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (
          data: RegistrationResponse[]
        ) => {

          console.log(
            'ALL REGISTRATIONS:',
            data
          );


          // Filter only current user's registrations

          this.registrations =
            (data ?? []).filter(
              registration =>
                registration.user?.id ===
                this.currentUserId
            );


          console.log(
            'MY REGISTRATIONS:',
            this.registrations
          );


          this.isLoading = false;


          this.changeDetectorRef.detectChanges();

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error: any) => {

          console.error(
            'REGISTRATION LOAD ERROR:',
            error
          );


          this.isLoading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load registrations.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  // ==========================================
  // CANCEL REGISTRATION
  // ==========================================

  cancelRegistration(
    id: number | undefined
  ): void {

    if (id === undefined) {

      console.error(
        'Registration ID is undefined.'
      );

      return;

    }


    const confirmed = confirm(
      'Are you sure you want to cancel this registration?'
    );


    if (!confirmed) {

      return;

    }


    console.log(
      'Cancelling registration:',
      id
    );


    this.registrationService
      .deleteRegistration(id)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: () => {

          console.log(
            'Registration cancelled successfully.'
          );


          this.successMessage =
            'Registration cancelled successfully.';


          this.loadRegistrations();

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error: any) => {

          console.error(
            'CANCEL REGISTRATION ERROR:',
            error
          );


          this.errorMessage =
            error?.error?.message ||
            'Unable to cancel registration.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  // ==========================================
  // BACK TO EVENTS
  // ==========================================

  backToEvents(): void {

    this.router.navigate([
      '/events'
    ]);

  }

}