import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../core/services/mainLayout/layout.service.service';

@Component({
  selector: 'app-store',
  standalone: false,
  
  template:`
      <mat-toolbar class="mat-elevation-z3 toolbar">
        <!-- Left side: Menu Button -->

         <div class="toolbar-left">
            <button 
                mat-icon-button
                (click)="this.layoutService.collapsed.set(!this.layoutService.collapsed())"
              >
                <mat-icon>menu</mat-icon>
            </button>
          </div>

            <!-- Right side: Dark Mode and Logout -->
          <div class="toolbar-right">
            <button mat-icon-button (click)="darkMode.set(!darkMode())">
              @if(darkMode()) {
                <mat-icon>light_mode</mat-icon>
              } @else {
                <mat-icon>dark_mode</mat-icon>
              }
            </button>

           

            <button class="logout" mat-icon-button (click)="logout.set(!logout())">
                <mat-icon>logout</mat-icon>
            </button>

            @if(logout()){
              <app-logout     
            (logoutConfirmed)="onLogoutConfirmed()" 
            (logoutCanceled)="onLogoutCanceled()">
          </app-logout>
            }


          </div>

    </mat-toolbar>

   
    <app-main-layout calss="main-layout"></app-main-layout>
  
 
  `,
  styles: `
      mat-toolbar {
    
      position: relative;
      z-index: 5;
      align-items: center;
      justify-content: space-between;
      --mat-toolbar-container-background-color: var(--sys-surface-container-low)
    }
    .toolbar-left {
      display: flex;
      align-items: center;
    }
    .toolbar-right{
      display: flex;
      align-items: center;
      padding-right: 5px;
      gap:8px;
    }

    .logout {
      position: relative;
      z-index: 10;
    }

    .main-layout{
      border: 18px solid red;
    }
    app-logout {
      position: absolute;
      border: 1px solid red;
      top: 40px; /* Adjust based on the height of the toolbar */
      right: 0; /* Aligns the dropdown to the logout button */
      background-color: var(--sys-surface-container-low); /* Matches the toolbar */
      padding: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      width:200px;
      transform: translateY(-10px);
      transform: translateX(-10px);
    }


  `
})
export class StoreComponent  implements OnInit, OnDestroy {

  constructor(public layoutService: LayoutService) {}
  title = 'my-app';
  logout = signal(false);

  darkMode = signal(false);
  setDarkMode = effect(() =>{
      document.documentElement.classList.toggle('dark',this.darkMode());
  });
  onLogoutConfirmed() {
    // Perform logout actions, such as redirecting to the login page or clearing session data
    console.log('User logged out');
  }
  
  onLogoutCanceled() {
    // Close the logout dropdown
    this.logout.set(false);
  }
  displayLogout(){
    console.log("hello world!");
  }



  ngOnInit() {
    console.log(this)
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.layoutService.collapsed.set(window.innerWidth <= 768);
  };

  toggle() {
    console.log("hello",!this.layoutService.collapsed())
    this.layoutService.collapsed.set(!this.layoutService.collapsed());
  }
}
