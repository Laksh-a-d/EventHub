import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';


// ==========================================
// REGISTRATION REQUEST
// ==========================================

export interface RegistrationRequest {

  userId?: number;

  eventId?: number;

  event?: {
    id: number;
  };

  user?: {
    id?: number;
  };

  registrationDate?: string;

  status?: 'REGISTERED' | 'CANCELLED';

}


// ==========================================
// REGISTRATION RESPONSE
// ==========================================

export interface RegistrationResponse {

  id?: number;

  user?: {

    id?: number;

    fullName?: string;

    email?: string;

  };

  event?: {

    id?: number;

    title?: string;

    description?: string;

    venue?: string;

    eventDate?: string;

  };

  registrationDate: string;

  status: 'REGISTERED' | 'CANCELLED';

  createdAt?: string;

  updatedAt?: string;

}


// ==========================================
// SERVICE
// ==========================================

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  // ========================================
  // API URL
  // ========================================

  private apiUrl =
    `${API_CONFIG.baseUrl}/registrations`;


  // ========================================
  // CONSTRUCTOR
  // ========================================

  constructor(
    private http: HttpClient
  ) {}


  // ========================================
  // CREATE REGISTRATION
  // ========================================

  createRegistration(
    registration: RegistrationRequest
  ): Observable<RegistrationResponse> {

    const payload = {
      event: {
        id: registration.eventId ?? registration.event?.id
      },
      registrationDate: registration.registrationDate,
      status: registration.status ?? 'REGISTERED'
    };

    console.log(
      'CREATING REGISTRATION:',
      payload
    );

    return this.http.post<RegistrationResponse>(
      this.apiUrl,
      payload
    );

  }


  // ========================================
  // GET ALL REGISTRATIONS (ADMIN)
  // ========================================

  getRegistrations(): Observable<RegistrationResponse[]> {

    console.log(
      'GET ALL REGISTRATIONS'
    );

    return this.http.get<RegistrationResponse[]>(
      this.apiUrl
    );

  }


  // ========================================
  // GET MY REGISTRATIONS (CURRENT USER)
  // ========================================

  getMyRegistrations(): Observable<RegistrationResponse[]> {

    console.log(
      'GET MY REGISTRATIONS'
    );

    return this.http.get<RegistrationResponse[]>(
      `${this.apiUrl}/my`
    );

  }


  // ========================================
  // GET REGISTRATION BY ID
  // ========================================

  getRegistrationById(
    id: number
  ): Observable<RegistrationResponse> {

    console.log(
      'GET REGISTRATION:',
      id
    );

    return this.http.get<RegistrationResponse>(
      `${this.apiUrl}/${id}`
    );

  }


  // ========================================
  // UPDATE REGISTRATION
  // ========================================

  updateRegistration(
    id: number,
    registration: RegistrationRequest
  ): Observable<RegistrationResponse> {

    console.log(
      'UPDATE REGISTRATION:',
      id
    );

    return this.http.put<RegistrationResponse>(
      `${this.apiUrl}/${id}`,
      registration
    );

  }


  // ========================================
  // DELETE REGISTRATION
  // ========================================

  deleteRegistration(
    id: number
  ): Observable<any> {

    console.log(
      'DELETE REGISTRATION:',
      id
    );

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}