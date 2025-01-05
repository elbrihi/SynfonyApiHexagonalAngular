import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthGuardService } from '../../../../core/guards/auth.guard.service';
import { Authservice } from '../../../../core/services/authservice/auth.service';

@Component({
  selector: 'app-logout',
  standalone: false,
  
  template:`
    <div class="logout-container">
      <p class="logout-message">Are you sure you want to log out?</p>
      <div class="logout-actions">
        <button mat-button color="primary" (click)="confirmLogout()">Yes</button>
        <button mat-button color="warn" (click)="cancelLogout()">No</button>
      </div>
    </div>
  
  `,
  styles: `
      .logout-container {
      padding: 16px;
      background-color: var(--sys-surface-container-low, #ffffff);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      text-align: center;
      animation: fadeIn 0.3s ease-in-out;
    }

    .logout-message {
      font-size: 16px;
      margin-bottom: 12px;
      color: var(--text-color, #333333);
    }

    .logout-actions {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
})
export class LogoutComponent {
  @Output() logoutConfirmed = new EventEmitter<void>();
  @Output() logoutCanceled = new EventEmitter<void>();
  authService = inject(Authservice)
  confirmLogout() {

    this.authService.logout();
    this.logoutConfirmed.emit();
  }

  cancelLogout() {
    this.logoutCanceled.emit();
  }

 
}
