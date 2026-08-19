import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// ======================================================
// CREATE EVENT REQUEST
// ======================================================

export interface EventRequest {

  title: string;

  description: string;

  venue: string;

  eventDate: string;

  capacity: number;

  categoryId: number;

  organizerId: number;
}


// ======================================================
// BACKEND CREATE PAYLOAD
// ======================================================

export interface EventCreatePayload {

  title: string;

  description: string;

  venue: string;

  eventDate: string;

  capacity: number;

  category: {
    id: number;
  };

  organizer: {
    id: number;
  };
}


// ======================================================
// UPDATE EVENT REQUEST
// ======================================================

export interface EventUpdateRequest {

  title: string;

  description: string;

  venue: string;

  eventDate: string;

  capacity: number;

  category: {
    id: number;
  };

  organizer: {
    id: number;
  };
}


// ======================================================
// EVENT RESPONSE
// ======================================================

export interface Event {

  id?: number;

  title: string;

  description: string;

  venue: string;

  eventDate: string;

  capacity: number;

  category?: {

    id?: number;

    name?: string;

    [key: string]: any;

  };

  organizer?: {

    id?: number;

    name?: string;

    email?: string;

    [key: string]: any;

  };
}


// ======================================================
// SERVICE
// ======================================================

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl =
    'http://localhost:8080/api/events';


  constructor(
    private http: HttpClient
  ) {}


  // ======================================================
  // CREATE EVENT
  // ======================================================

  createEvent(
    event: EventCreatePayload
  ): Observable<any> {

    console.log(
      'POST CREATE EVENT:',
      event
    );

    return this.http.post<any>(
      this.apiUrl,
      event
    );
  }


  // ======================================================
  // GET ALL EVENTS
  // ======================================================

  getEvents(): Observable<Event[]> {

    console.log(
      'GET EVENTS:',
      this.apiUrl
    );

    return this.http.get<Event[]>(
      this.apiUrl
    );
  }


  // ======================================================
  // GET EVENT BY ID
  // ======================================================

  getEventById(
    id: number
  ): Observable<Event> {

    console.log(
      'GET EVENT BY ID:',
      id
    );

    return this.http.get<Event>(
      `${this.apiUrl}/${id}`
    );
  }


  // ======================================================
  // UPDATE EVENT
  // ======================================================

  updateEvent(
    id: number,
    event: EventUpdateRequest
  ): Observable<any> {

    console.log(
      'UPDATE EVENT:',
      id
    );

    console.log(
      'UPDATE DATA:',
      event
    );

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      event
    );
  }


  // ======================================================
  // DELETE EVENT
  // ======================================================

  deleteEvent(
    id: number
  ): Observable<any> {

    console.log(
      'DELETE EVENT:',
      id
    );

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }

}