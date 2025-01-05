import { Component, computed, signal } from '@angular/core';
import { LayoutService } from '../../../core/services/mainLayout/layout.service.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  
  template:`

      <!--- app menu --->
      <mat-sidenav-container>                          
        <mat-sidenav 
          [mode]="sidenavMode()"
          [opened]="isSidenavOpen()"
          [style.width]="sidenavWidth()"
        >
         
            <app-custom-sidenav 
                [collapsed]="this.layoutService.collapsed()"
            >
            </app-custom-sidenav>
        </mat-sidenav>
        <mat-sidenav-content class="content" 
        [style.margin-left]="sidenavMargin()">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }
      mat-sidenav-container{
      }
      mat-sidenav{
      }
      mat-sidenav-content{
      }
      mat-sidenav,
      mat-sidenav-content{
        transition: all 500ms ease-in-out;
  
      }
      app-custom-sidenav{
      }
      .content {
        padding: 24px;
        
      }
  
      @media (max-width: 768px) {
        mat-sidenav-container {
          
          height: 100vh;
        }
        mat-sidenav {
          position: absolute;
          z-index: 6;
        }
        .content {
          margin-left: 0;
        }
      }
  
      @media (min-width: 769px) and (max-width: 1024px) {
        mat-sidenav {
          width: 200px;
        }
      }
  `
})
export class MainLayoutComponent {
  
  constructor(public layoutService: LayoutService) {}
  sidenavMode = () => window.innerWidth <= 768 ? 'over' : 'side';
  sidenavWidth = computed(() => this.layoutService.collapsed() ? '65px' : '250px' );

  isSidenavOpen = () => (window.innerWidth > 768 || !this.layoutService.collapsed());
  sidenavMargin = () => (window.innerWidth > 768 ? this.sidenavWidth() : '0');



}
