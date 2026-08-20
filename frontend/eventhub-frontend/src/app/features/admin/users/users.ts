import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UsersService,
  UserResponse,
  UserRequest
} from '../../../core/services/users';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class AdminUsers implements OnInit {

  users: UserResponse[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  // Modal / Form state
  showModal = false;
  isEditing = false;
  editingUserId: number | null = null;
  isSaving = false;

  formData: UserRequest = {
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'STUDENT'
  };

  formError = '';

  constructor(
    private usersService: UsersService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.changeDetectorRef.detectChanges();

    this.usersService.getUsers().subscribe({
      next: (data: UserResponse[]) => {
        this.users = data ?? [];
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error?.status === 403) {
          this.errorMessage = 'Access denied. Only administrators can view user management.';
        } else {
          this.errorMessage = error?.error?.message || 'Unable to load users.';
        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.formData = {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'STUDENT'
    };
    this.formError = '';
    this.showModal = true;
  }

  openEditModal(user: UserResponse): void {
    this.isEditing = true;
    this.editingUserId = user.id ?? null;
    this.formData = {
      fullName: user.fullName,
      email: user.email,
      password: '',
      phoneNumber: user.phoneNumber || '',
      role: user.role
    };
    this.formError = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.formError = '';
  }

  saveUser(): void {
    this.formError = '';

    if (!this.formData.fullName.trim()) {
      this.formError = 'Full name is required.';
      return;
    }
    if (!this.formData.email.trim()) {
      this.formError = 'Email is required.';
      return;
    }
    if (!this.isEditing && (!this.formData.password || this.formData.password.length < 6)) {
      this.formError = 'Password must be at least 6 characters.';
      return;
    }
    if (!this.formData.phoneNumber || !/^[0-9]{10}$/.test(this.formData.phoneNumber)) {
      this.formError = 'Phone number must be exactly 10 digits.';
      return;
    }

    this.isSaving = true;

    if (this.isEditing && this.editingUserId !== null) {
      const updatePayload: Partial<UserRequest> = {
        fullName: this.formData.fullName.trim(),
        email: this.formData.email.trim(),
        phoneNumber: this.formData.phoneNumber.trim(),
        role: this.formData.role
      };
      if (this.formData.password && this.formData.password.trim()) {
        updatePayload.password = this.formData.password.trim();
      }

      this.usersService.updateUser(this.editingUserId, updatePayload).subscribe({
        next: () => {
          this.isSaving = false;
          this.closeModal();
          this.successMessage = 'User updated successfully.';
          this.loadUsers();
          this.clearSuccessMessage();
        },
        error: (error: any) => {
          this.isSaving = false;
          this.formError = error?.error?.message || 'Unable to update user.';
          this.changeDetectorRef.detectChanges();
        }
      });
    } else {
      this.usersService.createUser(this.formData).subscribe({
        next: () => {
          this.isSaving = false;
          this.closeModal();
          this.successMessage = 'User created successfully.';
          this.loadUsers();
          this.clearSuccessMessage();
        },
        error: (error: any) => {
          this.isSaving = false;
          this.formError = error?.error?.message || 'Unable to create user.';
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  deleteUser(user: UserResponse): void {
    if (!user.id) return;

    const confirmed = confirm(`Are you sure you want to delete user "${user.fullName}" (${user.email})?`);
    if (!confirmed) return;

    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully.';
        this.loadUsers();
        this.clearSuccessMessage();
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Unable to delete user.';
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
