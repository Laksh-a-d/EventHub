import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  EventsService,
  EventCreatePayload
} from '../../../core/services/events';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css'
})
export class AddEvent {

  // ======================================================
  // FORM VARIABLES
  // ======================================================

  title = '';

  description = '';

  eventDate = '';

  venue = '';

  capacity: number | null = null;

  categoryId: number | null = null;

  organizerId: number | null = null;


  // ======================================================
  // UI VARIABLES
  // ======================================================

  isLoading = false;

  errorMessage = '';

  successMessage = '';


  // ======================================================
  // CONSTRUCTOR
  // ======================================================

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}


  // ======================================================
  // CREATE EVENT
  // ======================================================

  createEvent(): void {

    // Clear previous messages

    this.errorMessage = '';

    this.successMessage = '';


    // ====================================================
    // VALIDATION
    // ====================================================

    if (!this.title.trim()) {

      this.errorMessage =
        'Please enter event title.';

      return;
    }


    if (this.title.trim().length < 3) {

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
        'Please enter category ID.';

      return;
    }


    if (
      this.organizerId === null ||
      this.organizerId < 1
    ) {

      this.errorMessage =
        'Please enter organizer ID.';

      return;
    }


    // ====================================================
    // CREATE BACKEND PAYLOAD
    // ====================================================
    //
    // IMPORTANT:
    //
    // Your backend Event entity has:
    //
    // private Category category;
    // private User organizer;
    //
    // Therefore JSON must be:
    //
    // category: { id: categoryId }
    //
    // organizer: { id: organizerId }
    //
    // ====================================================

    const eventData: EventCreatePayload = {

      title: this.title.trim(),

      description: this.description.trim(),

      venue: this.venue.trim(),

      eventDate: this.eventDate,

      capacity: Number(this.capacity),

      category: {

        id: Number(this.categoryId)

      },

      organizer: {

        id: Number(this.organizerId)

      }

    };


    // ====================================================
    // DEBUG
    // ====================================================

    console.log(
      '================================'
    );

    console.log(
      'CREATING EVENT'
    );

    console.log(
      'EVENT DATA SENT TO BACKEND:'
    );

    console.log(
      JSON.stringify(
        eventData,
        null,
        2
      )
    );

    console.log(
      '================================'
    );


    // ====================================================
    // START LOADING
    // ====================================================

    this.isLoading = true;


    // ====================================================
    // API CALL
    // ====================================================

    this.eventsService
      .createEvent(eventData)
      .subscribe({

        // ==================================================
        // SUCCESS
        // ==================================================

        next: (response) => {

          console.log(
            'EVENT CREATED SUCCESSFULLY'
          );

          console.log(
            'BACKEND RESPONSE:',
            response
          );


          this.isLoading = false;


          this.successMessage =
            'Event created successfully!';


          // =================================================
          // REDIRECT TO EVENTS PAGE
          // =================================================

          setTimeout(() => {

            this.router.navigate([
              '/events'
            ]);

          }, 1000);

        },


        // ==================================================
        // ERROR
        // ==================================================

        error: (error) => {

          console.error(
            'CREATE EVENT ERROR:',
            error
          );


          console.error(
            'BACKEND RESPONSE:',
            error?.error
          );


          this.isLoading = false;


          this.errorMessage =
            error?.error?.message ||
            error?.error ||
            'Unable to create event.';

        }

      });

  }


  // ======================================================
  // CANCEL
  // ======================================================

  cancel(): void {

    this.router.navigate([
      '/events'
    ]);

  }

}