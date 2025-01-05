import { Component, input, model, inject } from '@angular/core';
import { Widget } from '../../../../model/dashboard';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  template:`
      <button mat-icon-button class="close-button" 
              (click)="showOptions.set(false)" >

          <mat-icon>close</mat-icon>
      </button>
      
      <div>
      Height
        <mat-button-toggle-group 
           hideSingleSelectionIndicator="true"
           [value]="data().columns ?? 1"
           (change) = "store.updateWidget(data().id ,{columns: +$event.value})"
          >
          <mat-button-toggle [value]="1">1</mat-button-toggle> 
          <mat-button-toggle [value]="2">2</mat-button-toggle>
          <mat-button-toggle [value]="3">3</mat-button-toggle>
          <mat-button-toggle [value]="4">4</mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <div>
        Height
        <mat-button-toggle-group 
            hideSingleSelectionIndicator="true"
            [value]="data().rows ?? 1"
            (change) = "store.updateWidget(data().id ,{rows: +$event.value})"

              
          >
          <mat-button-toggle [value]="1">1</mat-button-toggle>
          <mat-button-toggle [value]="2">2</mat-button-toggle>
          <mat-button-toggle [value]="3">3</mat-button-toggle>
          <mat-button-toggle [value]="4">4</mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <button 
      mat-icon-button 
      class="move-forward-button" 
      (click)="store.moveWidgetToRight(data().id)"
      
    >
      <mat-icon>chevron_right</mat-icon>
    </button>

    <button 
      mat-icon-button 
      class="move-backward-button" 
       (click)="store.moveWidgetToLeft(data().id)"
      

      
    >
      <mat-icon>chevron_left</mat-icon>
    </button>

    <button 
      mat-icon-button 
      class="remove-widget-button" 
      (click)="store.removedWidget(data().id)"
    >
      <mat-icon>delete</mat-icon>
    </button>
  `,
   standalone: false,
  styles:`

:host {
    position: absolute;
    z-index: 2;
    background: var(--sys-surface-container);
    color: var(--sys-inverse-surface);
    top: 0;
    left: 0;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
  }

  :host div {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px; 
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
  }



  .move-forward-button {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
    }

    .move-backward-button {
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
    }
  .remove-widget-button{
      position: absolute;
      top: 0;
      left: 0px;
      color: var(--sys-error);
  }
  /* Individual button styling */
  .mat-button-toggle {
    height: 32px; /* Adjust height */
    width: 32px;  /* Adjust width */
    background-color: lightblue; /* Example background */
    border-radius: 50%; /* Circular buttons */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .mat-button-toggle.mat-button-toggle-checked {
    background-color: blue; /* Highlight for selected state */
    color: white;
  }



  `
})
export class WidgetOptionsComponent {

  data = input.required<Widget>();
  showOptions = model<boolean>(false);
  store = inject(DashboardService)


}
