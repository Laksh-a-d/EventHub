import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalUsers = 0;
  totalEvents = 0;
  totalCategories = 0;
  totalRegistrations = 0;
  upcomingEvents = 0;

  isLoading = true;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.dashboardService.getDashboard().subscribe({
      next: (data: any) => {
        this.totalUsers = data.totalUsers ?? 0;
        this.totalEvents = data.totalEvents ?? 0;
        this.totalCategories = data.totalCategories ?? 0;
        this.totalRegistrations = data.totalRegistrations ?? 0;
        this.upcomingEvents = data.upcomingEvents ?? 0;

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 403) {
          this.errorMessage = 'Access denied. Administrator privileges required.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load dashboard data.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}