import { Component, input, signal } from '@angular/core';
import { Widget } from '../../model/dashboard';

@Component({
  selector: 'app-widget',
  template: `
    <div class="container mat-elevation-z3"
       [style.background-color]="data().backgroundColor ?? 'var(--sys-surface-bright)'"
       [style.color]="data().color ?? 'inherit'"
       cdkDrag
       
       >
      <h3 class="m-0">{{ data().label }}</h3>
      <button 
        class="settings-button" 
        mat-icon-button 
        (click)="showOptions.set(true)"
        [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
       
       
       >
        <mat-icon>settings</mat-icon>
      </button>
      <ng-container [ngComponentOutlet]="data().content"></ng-container>
    
      @if (showOptions()){
        <app-widget-options [(showOptions)] ="showOptions" [data]="data()"/>
      }
      <div *cdkDragPlaceholder></div>
    
    </div>

  `,
   standalone: false,
    styles: `
    :host{
      display: block;
      border-radius: 16px;
    }
    .container{
      position: relative; /* Ensure container is the reference point */
      height: 100%; 
      width: 100%;
      padding: 32px;
      box-sizing: border-box;
      border-radius: inherit;
      overflow: hidden;
       /* Debugging visual */
    }
    .settings-button{
      position: absolute; /* Position relative to .container */
      top: 12px; /* Adjust spacing as needed */
      right: 12px; /* Adjust spacing as needed */
    }



    
   
 `,

   host: {
   '[style.grid-area]': '"span " + (data().rows ?? 1) + " / span " + (data().columns ?? 1)'
}


})
export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal(false)
}
