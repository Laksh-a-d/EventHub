import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';

import {
  EventsService,
  Event
} from '../../../core/services/events';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events implements OnInit {

  // ============================
  // VARIABLES
  // ============================

  events: Event[] = [];

  isLoading = true;

  errorMessage = '';


  // ============================
  // CONSTRUCTOR
  // ============================

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  // ============================
  // INIT
  // ============================

  ngOnInit(): void {

    console.log(
      'EVENTS COMPONENT ngOnInit()'
    );

    this.loadEvents();
  }


  // ============================
  // LOAD EVENTS
  // ============================

  loadEvents(): void {

    console.log(
      'STARTING API CALL'
    );

    this.isLoading = true;

    this.errorMessage = '';


    // Force loading state update

    this.changeDetectorRef.detectChanges();


    this.eventsService
      .getEvents()
      .subscribe({

        // ============================
        // SUCCESS
        // ============================

        next: (data: Event[]) => {

          console.log(
            'API SUCCESS'
          );

          console.log(
            'DATA:',
            data
          );


          // Make sure we always have an array

          this.events = data ?? [];


          console.log(
            'EVENTS ARRAY:',
            this.events
          );


          // Stop loading

          this.isLoading = false;


          console.log(
            'isLoading:',
            this.isLoading
          );


          // Force Angular HTML update

          this.changeDetectorRef.detectChanges();


          console.log(
            'CHANGE DETECTION COMPLETED'
          );

        },


        // ============================
        // ERROR
        // ============================

        error: (error: any) => {

          console.error(
            'API ERROR:',
            error
          );


          this.isLoading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load events.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  // ============================
  // ADD EVENT
  // ============================

  addEvent(): void {

    console.log(
      'Opening Add Event page'
    );


    this.router.navigate([
      '/events/add'
    ]);

  }


  // ============================
  // EDIT EVENT
  // ============================

  editEvent(id: number): void {

    console.log(
      'Opening edit event:',
      id
    );


    this.router.navigate([
      '/events/edit',
      id
    ]);

  }


  // ============================
  // REGISTER EVENT
  // ============================

  registerEvent(id: number): void {

    console.log(
      'Opening registration page for event:',
      id
    );


    // Navigate to registration page
    // We will create this page next.

    this.router.navigate([
      '/events/register',
      id
    ]);

  }


  // ============================
  // DELETE EVENT
  // ============================

  deleteEvent(
    id: number | undefined
  ): void {

    // Prevent undefined ID

    if (id === undefined) {

      console.error(
        'Cannot delete event: ID is undefined'
      );

      return;
    }


    // Confirmation

    const confirmed = confirm(
      'Are you sure you want to delete this event?'
    );


    if (!confirmed) {

      return;
    }


    console.log(
      'Deleting event:',
      id
    );


    this.eventsService
      .deleteEvent(id)
      .subscribe({

        // ============================
        // DELETE SUCCESS
        // ============================

        next: () => {

          console.log(
            'Event deleted successfully'
          );


          // Reload events

          this.loadEvents();

        },


        // ============================
        // DELETE ERROR
        // ============================

        error: (error: any) => {

          console.error(
            'Delete event error:',
            error
          );


          this.errorMessage =
            error?.error?.message ||
            'Unable to delete event.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }

}