 import { computeMsgId } from '@angular/compiler';
import { Component, computed, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label : string;
  route: string;

}




@Component({
  selector: 'app-custom-sidenav',
  template: `
      <div class="sidenav-header">
        <img  [width]="profilePicSize()"  
              [height]="profilePicSize()"
              src="images/github.jpg" alt="">
        <div class="header-text" [class.hide-header-text] = "sideNavCallapsed()" >
          <h2> Your Channel</h2>
          <p> Elbrihi yasine</p>
        </div>
      </div>
      <mat-nav-list>
        <a class="menu-item"
            mat-list-item *ngFor="let item of menuItems()" 
            [routerLink]="item.route"
            routerLinkActive="selected-menu-item"
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            
        >
<!-- ngIf -->
            <mat-icon [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlines'" matListItemIcon>{{ item.label }}</mat-icon>
            <span matListItemTitle >
              {{item.label}}
            
            </span>

        </a>
      </mat-nav-list>
  
  `,
   standalone: false,
  styles:[
    `
      :host * {
        transition: all 500ms ease-in-out;
      }
      .sidenav-header {
        padding-top: 24px;
        text-align: center;
      }
      .sidenav-header img {
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 16px;
      }
      .header-text{
        height: 3rem;
      }
      .header-text h2 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
      }
      .header-text p {
        margin: 0;
        font-size: 0.8rem;
      }
      .hide-header-text{
        opacity: 0;
        height: 0px !important;
      }
      .menu-item{
        border-left: 5px solid;
        border-left-color: rgba(0,0,0,0);
      }
      .selected-menu-item{
        border-left-color: var(--primary-color);
        background: rgba(0,0,0,0.05)

      }
      
    
    `
  ] 
})
export class CustomSidenavComponent {

  @Input() profilePicture: string = '/github.jpg'; // Default image path
    sideNavCallapsed   = signal(false);

    @Input() set collapsed(val: boolean){
      this.sideNavCallapsed.set(val);
    }

    
    menuItems = signal<MenuItem[]>([
     { 
       icon: 'dashboard',
       label: 'Dashboard',
       route: 'dashboard'
      },
      { icon: 'content',
        label: 'Content',
        route: 'content'
      },
      { icon: 'analytics',
        label: 'Analytics',
        route: 'analytics'
      },
      { icon: 'comments',
        label: 'Comments',
        route: 'comments'
      }
    ])


    profilePicSize = computed(() => this.sideNavCallapsed() ? '32' : '100')
}
