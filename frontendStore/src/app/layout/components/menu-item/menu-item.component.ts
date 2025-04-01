import { AfterViewInit, Component, input, signal, ViewChild } from '@angular/core';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  
  template:`
      <a 
            mat-list-item 
            class="menu-item"          
            [routerLink]="item().subItems?.length ? null :  item().route "
            (click)="toggleNested()"
            (click)="test(item().icon )"
            routerLinkActive="selected-menu-item"
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            (click)="logRla(rla, item())"
        >
            <mat-icon matListItemIcon>
                {{ item().icon }}
            </mat-icon>
           
            @if (!collapsed())
            {
              <span matListItemTitle>{{ item().label }}</span>
            }  
            @if(item().subItems){
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
            <a 
                class="menu-item indented"
                mat-list-item 
                [routerLink]="item().route + '/' + subItem.route"
                routerLinkActive
                #rla="routerLinkActive"
                [activated]="rla.isActive"
                (click)="test(item().icon )"
            >
            <mat-icon matListItemIcon>{{ subItem.icon}}</mat-icon>
           
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

        .menu-item {
        border-left: 5px solid;
        border-left-color: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        padding: 10px 16px;
      }

      .selected-menu-item {
        border-left-color: var(--primary-color);
        background: rgba(0, 0, 0, 0.05);
      }

      /* Ensure styles apply to nested items */
      .indented {
        --mat-list-list-item-leading-icon-start-space: 48px;
        padding-left: 16px; /* Ensure sub-items are visually distinct */
      }

  `
})
export class MenuItemComponent implements AfterViewInit{

  item = input.required<MenuItem>()
  collapsed = input(false);
  nestedMenuOpen = signal(false);

  @ViewChild('rla', { static: false }) rla!: RouterLinkActive;

  ngAfterViewInit() {
   // console.log('rla.isActive:', this.rla.isActive);
  }
  test(item:any){
    console.log("item",item)
  }
  toggleNested(){
    if(!this.item().subItems){
      return ;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen())
  }

  logRla(rla: RouterLinkActive, item: MenuItem) {
   /* console.log('RouterLinkActive:', rla);
    console.log('Is Active:', rla.isActive);
    console.log('Expected Route:', item.route);*/
  }


}
