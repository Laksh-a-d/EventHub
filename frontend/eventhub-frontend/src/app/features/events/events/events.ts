import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  EventsService,
  Event
} from '../../../core/services/events';
import { AuthService } from '../../../core/services/auth';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events implements OnInit {

  events: Event[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  isAdmin = false;

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.changeDetectorRef.detectChanges();

    this.eventsService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data ?? [];
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 401) {
          this.errorMessage = 'Please log in to view events.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load events.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  addEvent(): void {
    this.router.navigate(['/events/add']);
  }

  editEvent(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  registerEvent(id: number): void {
    this.router.navigate(['/events/register', id]);
  }

  deleteEvent(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this event?');
    if (!confirmed) {
      return;
    }

    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        this.successMessage = 'Event deleted successfully.';
        this.loadEvents();
        setTimeout(() => {
          this.successMessage = '';
          this.changeDetectorRef.detectChanges();
        }, 3000);
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Unable to delete event.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}