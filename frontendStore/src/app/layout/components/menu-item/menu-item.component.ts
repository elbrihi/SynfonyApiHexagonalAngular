import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  
  template:`

      <a 
            mat-list-item 
            class="menu-item"          
            [routerLink]="item().subItems?.length ? null :  item().route "
            (click)="toggleNested()"
            routerLinkActive="selected-menu-item"
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            
        >

            <mat-icon 
                [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlines'" matListItemIcon>
                {{ item().icon }}
            </mat-icon>
           
            @if (!collapsed())
            {
              <span matListItemTitle>{{ item().label }}</span>
            }  @if(item().subItems){
              <span matListItemMeta>
               @if(nestedMenuOpen()){
                  <mat-icon>expand_less</mat-icon>
               }@else {
                <mat-icon>expand_more</mat-icon>
               }
                
              </span>

            } 
           
       
      </a>
     
      @if(item().subItems && nestedMenuOpen())
      {
        <div>
          @for (subItem of item().subItems; track subItem.label) {
            <a class="menu-item indented"
            mat-list-item 
            [routerLink]="item().route + '/' + subItem.route"
            routerLinkActive
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            
        >
<!-- ngIf -->

            <mat-icon [fontSet]="rla.isActive ?
             'material-icons' : 'material-icons-outlines'" 
             matListItemIcon>{{ subItem.icon}}</mat-icon>
           
            @if (!collapsed())
            {
              <span matListItemTitle>{{ subItem.label }}</span>
            } 
           </a>
          }
        </div>
      }
  `,
  styles:`
  :host * {
          transition: all 500ms ease-in-out;
        }

    .menu-item{
      border-left: 5px solid;
      border-left-color: rgba(0,0,0,0);
    }
    .selected-menu-item{
      border-left-color: var(--primary-color);
      background: rgba(0,0,0,0.05)

    }
    .indented{
      --mat-list-list-item-leading-icon-start-space: 48px;
    }
  `
})
export class MenuItemComponent {

  item = input.required<MenuItem>()
  collapsed = input(false);
  nestedMenuOpen = signal(false);

  toggleNested(){
    if(!this.item().subItems){
      return ;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen())
  }
}
