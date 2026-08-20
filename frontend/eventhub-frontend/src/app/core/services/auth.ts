import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // ==========================================
  // LOGIN
  // ==========================================

  login(
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    ).pipe(

      tap(response => {

        console.log(
          'LOGIN RESPONSE:',
          response
        );

        if (response.token) {

          localStorage.setItem(
            'token',
            response.token
          );

          console.log(
            'JWT SAVED'
          );

        } else {

          console.error(
            'NO JWT TOKEN IN LOGIN RESPONSE'
          );

        }

      })

    );
  }


  // ==========================================
  // GET TOKEN
  // ==========================================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }


  // ==========================================
  // GET USER ID FROM JWT
  // ==========================================

  getUserId(): number | null {

    const token = this.getToken();

    if (!token) {

      return null;

    }

    try {

      const payload = JSON.parse(
        atob(
          token.split('.')[1]
        )
      );

      console.log(
        'JWT PAYLOAD:',
        payload
      );


      /*
       * Your backend JWT may store the
       * user ID under one of these names.
       */

      const userId =
        payload.userId ??
        payload.id ??
        payload.sub;


      if (userId === undefined || userId === null) {

        console.error(
          'USER ID NOT FOUND IN JWT'
        );

        return null;

      }


      return Number(userId);

    } catch (error) {

      console.error(
        'ERROR DECODING JWT:',
        error
      );

      return null;

    }

  }


  // ==========================================
  // GET USER ROLE FROM JWT
  // ==========================================

  getUserRole(): string | null {

    const token = this.getToken();

    if (!token) {

      return null;

    }

    try {

      const payload = JSON.parse(
        atob(
          token.split('.')[1]
        )
      );


      return (
        payload.role ??
        payload.roles ??
        null
      );

    } catch (error) {

      console.error(
        'ERROR READING JWT ROLE:',
        error
      );

      return null;

    }

  }


  // ==========================================
  // GET USER EMAIL FROM JWT
  // ==========================================

  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email ?? payload.sub ?? null;
    } catch {
      return null;
    }
  }

  // ==========================================
  // GET FULL NAME FROM JWT
  // ==========================================

  getFullName(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.fullName ?? null;
    } catch {
      return null;
    }
  }

  // ==========================================
  // CHECK IF ADMIN
  // ==========================================

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  // ==========================================
  // CHECK IF STUDENT
  // ==========================================

  isStudent(): boolean {
    const role = this.getUserRole();
    return role === 'STUDENT' || role === 'ROLE_STUDENT';
  }

  // ==========================================
  // GET CURRENT USER OBJECT
  // ==========================================

  getCurrentUser(): { id: number | null; email: string | null; fullName: string | null; role: string | null } | null {
    if (!this.isLoggedIn()) return null;
    return {
      id: this.getUserId(),
      email: this.getUserEmail(),
      fullName: this.getFullName(),
      role: this.getUserRole()
    };
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  logout(): void {

    localStorage.removeItem(
      'token'
    );

  }


  // ==========================================
  // CHECK LOGIN
  // ==========================================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

}