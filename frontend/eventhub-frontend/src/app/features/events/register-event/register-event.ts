import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css'
})
export class RegisterEvent implements OnInit {

  eventId: number | null = null;
  event: Event | null = null;
  isLoading = true;
  isRegistering = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private registrationService: RegistrationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventId();
  }

  getEventId(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Event ID is missing.';
      this.isLoading = false;
      return;
    }

    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId < 1) {
      this.errorMessage = 'Invalid event ID.';
      this.isLoading = false;
      return;
    }

    this.eventId = parsedId;
    this.loadEvent();
  }

  loadEvent(): void {
    if (this.eventId === null) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.eventsService.getEventById(this.eventId).subscribe({
      next: (data: Event) => {
        this.event = data;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 404) {
          this.errorMessage = 'The requested event was not found.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load event details.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.eventId === null || !this.event) {
      this.errorMessage = 'Event information is not available.';
      return;
    }

    const registrationData: RegistrationRequest = {
      eventId: this.eventId,
      registrationDate: this.getTodayDate(),
      status: 'REGISTERED'
    };

    this.isRegistering = true;
    this.changeDetectorRef.detectChanges();

    this.registrationService.createRegistration(registrationData).subscribe({
      next: (response) => {
        this.isRegistering = false;
        this.successMessage = 'Event registered successfully! Redirecting to your registrations...';
        this.changeDetectorRef.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/events/my-registrations']);
        }, 1200);
      },
      error: (error: any) => {
        this.isRegistering = false;
        if (error?.status === 409) {
          this.errorMessage = 'You are already registered for this event.';
        } else if (error?.status === 400) {
          this.errorMessage = error?.error?.message || 'Unable to complete registration. Event may be full.';
        } else if (error?.status === 401) {
          this.errorMessage = 'Please log in to register for this event.';
        } else if (error?.status === 403) {
          this.errorMessage = 'You do not have permission to register for this event.';
        } else if (error?.status === 404) {
          this.errorMessage = 'The requested event was not found.';
        } else {
          this.errorMessage = error?.error?.message || 'Something went wrong on the server. Please try again later.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
}