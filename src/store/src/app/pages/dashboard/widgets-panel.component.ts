import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-widgets-panel',
  standalone: false,
  
  template: `
     <div class="widgets-list">
      <div class="widgests-panel-header">
        <mat-icon>drag_indicator</mat-icon>
          Wigests
      </div>
      @for (widget of store.widgetsToAdd(); track widget.id) 
      {
       
        <div cdkDrag class="widget-box" [cdkDragData]="widget.id">
        {{widget.label}}
        <div *cdkDragPlaceholder></div>

        </div>
      }
     </div>
  
  
  `,
  styles: `

    :host{
      background: var(--sys-primary-container);
      color: var(--sys-on-primary-container);
      position: absolute;
      right: 10px;
      top:100px;
      width: 200px;
      z-index:2;
      border-radius: 16px;
    }
    .widget-box{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      background: var(--sys-surface-container);
      color: var(--sys-inverse-surface);
      cursor: pointer;
      padding: 8px 16px 8px 16px;
      font-size: 1.1em
    }
    .widget-box:hover{
      background: var(--sys-surface-container-high);
    }
    .widgets-list{
      display: flex;
      flex-direction: column;
      gap:8px;
      padding: 16px;
      border-radius: 8px;
    }
    .widgests-panel-header{
      display: flex;
      gap: 8px;
      align-items: center;  
    }
     
  `
})
export class WidgetsPanelComponent {


  store = inject(DashboardService);

  widgetOpen = signal(false)
}
