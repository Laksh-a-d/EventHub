import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { DashboardService } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('Dashboard component loaded');

    this.loadDashboard();
  }

  loadDashboard(): void {

    console.log('Loading dashboard...');

    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboard().subscribe({

      next: (data: any) => {

        console.log('Dashboard data:', data);

        this.totalUsers = data.totalUsers ?? 0;
        this.totalEvents = data.totalEvents ?? 0;
        this.totalCategories = data.totalCategories ?? 0;
        this.totalRegistrations = data.totalRegistrations ?? 0;
        this.upcomingEvents = data.upcomingEvents ?? 0;

        this.isLoading = false;

        console.log('Loading finished');
        console.log('isLoading:', this.isLoading);

        // Force Angular to update the HTML
        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error('Dashboard error:', error);

        this.isLoading = false;

        this.errorMessage =
          'Unable to load dashboard data.';

        // Force Angular to update the HTML
        this.cdr.detectChanges();
      }

    });
  }
}