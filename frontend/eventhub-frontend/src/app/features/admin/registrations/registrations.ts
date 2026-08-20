import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RegistrationService,
  RegistrationResponse
} from '../../../core/services/registration';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './registrations.html',
  styleUrl: './registrations.css'
})
export class AdminRegistrations implements OnInit {

  allRegistrations: RegistrationResponse[] = [];
  filteredRegistrations: RegistrationResponse[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  statusFilter: 'ALL' | 'REGISTERED' | 'CANCELLED' = 'ALL';
  searchTerm = '';

  constructor(
    private registrationService: RegistrationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.changeDetectorRef.detectChanges();

    this.registrationService.getRegistrations().subscribe({
      next: (data: RegistrationResponse[]) => {
        this.allRegistrations = data ?? [];
        this.applyFilter();
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 403) {
          this.errorMessage = 'Access denied. Only administrators can view all registrations.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load registrations.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  applyFilter(): void {
    let list = [...this.allRegistrations];

    if (this.statusFilter !== 'ALL') {
      list = list.filter(r => r.status === this.statusFilter);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(r =>
        r.event?.title?.toLowerCase().includes(term) ||
        r.user?.fullName?.toLowerCase().includes(term) ||
        r.user?.email?.toLowerCase().includes(term) ||
        r.event?.venue?.toLowerCase().includes(term)
      );
    }

    this.filteredRegistrations = list;
    this.changeDetectorRef.detectChanges();
  }

  onFilterChange(): void {
    this.applyFilter();
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  cancelRegistration(reg: RegistrationResponse): void {
    if (!reg.id) return;

    const confirmed = confirm(`Are you sure you want to cancel the registration for "${reg.user?.fullName}" on "${reg.event?.title}"?`);
    if (!confirmed) return;

    this.registrationService.deleteRegistration(reg.id).subscribe({
      next: () => {
        this.successMessage = 'Registration cancelled successfully.';
        this.loadRegistrations();
        this.clearSuccessMessage();
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Unable to cancel registration.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private clearSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.changeDetectorRef.detectChanges();
    }, 3000);
  }
}
