import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  EventsService,
  Event
} from '../../../core/services/events';

import {
  RegistrationService,
  RegistrationRequest
} from '../../../core/services/registration';


@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css'
})
export class RegisterEvent implements OnInit {

  // ==========================================
  // VARIABLES
  // ==========================================

  eventId: number | null = null;

  event: Event | null = null;

  isLoading = true;

  isRegistering = false;

  errorMessage = '';

  successMessage = '';


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private registrationService: RegistrationService
  ) {}


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    console.log(
      'REGISTER EVENT COMPONENT'
    );

    this.getEventId();

  }


  // ==========================================
  // GET EVENT ID FROM URL
  // ==========================================

  getEventId(): void {

    const id = this.route.snapshot.paramMap.get('id');


    if (!id) {

      this.errorMessage =
        'Event ID is missing.';

      this.isLoading = false;

      return;
    }


    const parsedId = Number(id);


    if (isNaN(parsedId) || parsedId < 1) {

      this.errorMessage =
        'Invalid event ID.';

      this.isLoading = false;

      return;
    }


    this.eventId = parsedId;


    console.log(
      'EVENT ID:',
      this.eventId
    );


    this.loadEvent();

  }


  // ==========================================
  // LOAD EVENT
  // ==========================================

  loadEvent(): void {

    if (this.eventId === null) {

      return;
    }


    this.isLoading = true;

    this.errorMessage = '';


    this.eventsService
      .getEventById(this.eventId)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (data: Event) => {

          console.log(
            'EVENT LOADED:',
            data
          );


          this.event = data;

          this.isLoading = false;

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error: any) => {

          console.error(
            'LOAD EVENT ERROR:',
            error
          );


          this.isLoading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load event.';

        }

      });

  }


  // ==========================================
  // REGISTER EVENT
  // ==========================================

  register(): void {

    this.errorMessage = '';

    this.successMessage = '';


    // ========================================
    // VALIDATE EVENT
    // ========================================

    if (this.eventId === null) {

      this.errorMessage =
        'Event ID is missing.';

      return;
    }


    if (!this.event) {

      this.errorMessage =
        'Event information is not available.';

      return;
    }


    // ========================================
    // IMPORTANT
    // ========================================
    // Temporary student ID.
    //
    // Your current database has:
    //
    // ADMIN   = 3
    // STUDENT = 4
    //
    // We will replace this with the
    // logged-in user's ID when we connect
    // your authentication/user service.
    // ========================================

    const userId = 4;


    // ========================================
    // CREATE REQUEST
    // ========================================

    const registrationData: RegistrationRequest = {

      userId: userId,

      eventId: this.eventId,

      registrationDate:
        this.getTodayDate(),

      status: 'REGISTERED'

    };


    console.log(
      '================================'
    );

    console.log(
      'REGISTERING EVENT'
    );

    console.log(
      'REGISTRATION DATA:',
      registrationData
    );

    console.log(
      '================================'
    );


    this.isRegistering = true;


    // ========================================
    // API CALL
    // ========================================

    this.registrationService
      .createRegistration(registrationData)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (response) => {

          console.log(
            'REGISTRATION SUCCESSFUL'
          );

          console.log(
            'RESPONSE:',
            response
          );


          this.isRegistering = false;


          this.successMessage =
            'Event registered successfully!';


          // Redirect after success

          setTimeout(() => {

            this.router.navigate([
              '/events'
            ]);

          }, 1200);

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error: any) => {

          console.error(
            'REGISTRATION ERROR:',
            error
          );


          console.error(
            'BACKEND RESPONSE:',
            error?.error
          );


          this.isRegistering = false;


          this.errorMessage =
            error?.error?.message ||
            error?.error ||
            'Unable to register for event.';

        }

      });

  }


  // ==========================================
  // TODAY DATE
  // ==========================================

  getTodayDate(): string {

    const today = new Date();

    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


  // ==========================================
  // CANCEL
  // ==========================================

  cancel(): void {

    this.router.navigate([
      '/events'
    ]);

  }

}