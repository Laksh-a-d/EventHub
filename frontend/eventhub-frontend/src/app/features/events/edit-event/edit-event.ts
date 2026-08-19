import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  EventsService,
  Event,
  EventUpdateRequest
} from '../../../core/services/events';


@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css'
})
export class EditEvent implements OnInit {

  // ============================
  // EVENT ID
  // ============================

  eventId: number | null = null;


  // ============================
  // FORM FIELDS
  // ============================

  title = '';

  description = '';

  eventDate = '';

  venue = '';

  capacity: number | null = null;

  categoryId: number | null = null;

  organizerId: number | null = null;


  // ============================
  // UI VARIABLES
  // ============================

  isLoading = true;

  isUpdating = false;

  errorMessage = '';

  successMessage = '';


  // ============================
  // CONSTRUCTOR
  // ============================

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  // ============================
  // INIT
  // ============================

  ngOnInit(): void {

    console.log(
      'EDIT EVENT COMPONENT STARTED'
    );


    // Get ID from URL

    const id =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'EVENT ID FROM URL:',
      id
    );


    if (!id) {

      this.errorMessage =
        'Event ID is missing.';

      this.isLoading = false;

      return;
    }


    this.eventId = Number(id);


    if (
      isNaN(this.eventId)
    ) {

      this.errorMessage =
        'Invalid event ID.';

      this.isLoading = false;

      return;
    }


    // Load event

    this.loadEvent();

  }


  // ============================
  // LOAD EVENT
  // ============================

  loadEvent(): void {

    if (this.eventId === null) {

      return;
    }


    console.log(
      'Loading event:',
      this.eventId
    );


    this.isLoading = true;

    this.errorMessage = '';


    this.eventsService
      .getEventById(this.eventId)
      .subscribe({

        // ============================
        // SUCCESS
        // ============================

        next: (event: Event) => {

          console.log(
            'EVENT LOADED:',
            event
          );


          // ============================
          // FILL FORM
          // ============================

          this.title =
            event.title ?? '';


          this.description =
            event.description ?? '';


          this.eventDate =
            event.eventDate ?? '';


          this.venue =
            event.venue ?? '';


          this.capacity =
            event.capacity ?? null;


          // Category ID

          this.categoryId =
            event.category?.id ?? null;


          // Organizer ID

          this.organizerId =
            event.organizer?.id ?? null;


          this.isLoading = false;


          this.changeDetectorRef.detectChanges();


          console.log(
            'EDIT FORM FILLED'
          );

        },


        // ============================
        // ERROR
        // ============================

        error: (error: any) => {

          console.error(
            'LOAD EVENT ERROR:',
            error
          );


          this.isLoading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load event.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  // ============================
  // UPDATE EVENT
  // ============================

  updateEvent(): void {

    this.errorMessage = '';

    this.successMessage = '';


    // ============================
    // CHECK EVENT ID
    // ============================

    if (this.eventId === null) {

      this.errorMessage =
        'Event ID is missing.';

      return;
    }


    // ============================
    // VALIDATION
    // ============================

    if (!this.title.trim()) {

      this.errorMessage =
        'Please enter event title.';

      return;
    }


    if (
      this.title.trim().length < 3
    ) {

      this.errorMessage =
        'Title must be at least 3 characters.';

      return;
    }


    if (!this.description.trim()) {

      this.errorMessage =
        'Please enter event description.';

      return;
    }


    if (!this.eventDate) {

      this.errorMessage =
        'Please select event date.';

      return;
    }


    if (!this.venue.trim()) {

      this.errorMessage =
        'Please enter event venue.';

      return;
    }


    if (
      this.capacity === null ||
      this.capacity < 1
    ) {

      this.errorMessage =
        'Capacity must be at least 1.';

      return;
    }


    if (
      this.categoryId === null ||
      this.categoryId < 1
    ) {

      this.errorMessage =
        'Category ID is required.';

      return;
    }


    if (
      this.organizerId === null ||
      this.organizerId < 1
    ) {

      this.errorMessage =
        'Organizer ID is required.';

      return;
    }


    // ============================
    // CREATE UPDATE REQUEST
    // ============================

    const eventData: EventUpdateRequest = {

      title:
        this.title.trim(),

      description:
        this.description.trim(),

      venue:
        this.venue.trim(),

      eventDate:
        this.eventDate,

      capacity:
        Number(this.capacity),

      category: {
        id: Number(this.categoryId)
      },

      organizer: {
        id: Number(this.organizerId)
      }

    };


    console.log(
      '================================'
    );

    console.log(
      'UPDATING EVENT'
    );

    console.log(
      'EVENT ID:',
      this.eventId
    );

    console.log(
      'UPDATE DATA:',
      eventData
    );

    console.log(
      '================================'
    );


    this.isUpdating = true;


    // ============================
    // API CALL
    // ============================

    this.eventsService
      .updateEvent(
        this.eventId,
        eventData
      )
      .subscribe({

        // ============================
        // SUCCESS
        // ============================

        next: (response) => {

          console.log(
            'EVENT UPDATED SUCCESSFULLY'
          );

          console.log(
            'BACKEND RESPONSE:',
            response
          );


          this.isUpdating = false;


          this.successMessage =
            'Event updated successfully!';


          // Go back to events page

          setTimeout(() => {

            this.router.navigate([
              '/events'
            ]);

          }, 1000);

        },


        // ============================
        // ERROR
        // ============================

        error: (error: any) => {

          console.error(
            'UPDATE EVENT ERROR:',
            error
          );


          console.error(
            'BACKEND RESPONSE:',
            error?.error
          );


          this.isUpdating = false;


          this.errorMessage =
            error?.error?.message ||
            error?.error ||
            'Unable to update event.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  // ============================
  // CANCEL
  // ============================

  cancel(): void {

    this.router.navigate([
      '/events'
    ]);

  }

}