import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  userName = '';
  userEmail = '';
  userRole = '';
  isAdmin = false;
  isStudent = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getFullName() || this.authService.getUserEmail() || 'User';
    this.userEmail = this.authService.getUserEmail() || '';
    this.userRole = this.authService.getUserRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isStudent = this.authService.isStudent();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
