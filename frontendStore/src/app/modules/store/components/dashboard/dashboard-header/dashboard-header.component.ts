import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { wrapGrid } from 'animate-css-grid';
import { DashboardService } from '../../../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: false,
  
  template:`
      <div class="header">
      <h2>Channel Dashboard</h2> 
      
      
      <button mat-raised-button
             [mat-menu-trigger-for] = "widgetMenu"
             (click)="widgetsOpen.set(!widgetsOpen())"
             
             >
             @if (widgetsOpen())
              { 
                <mat-icon>close</mat-icon>
              }@else{
                <mat-icon>add_circle</mat-icon>
              }
     
        
          Widgets
      </button>
      @if (widgetsOpen())
      {
        <app-widgets-panel 
                  cdkDropList 
                  (cdkDropListDropped)="widgetPutBack($event)"
                  cdkDrag
                  />
      }
     <mat-menu #widgetMenu="matMenu">
        @for (widget of store.widgetsToAdd(); track widget.id)
        {
          <button mat-menu-item  (click)="store.addWidget(widget)">
              {{widget.label}}
          </button>

        } @empty {
          <button mat-menu-item>
              No 
          </button>
        }

      </mat-menu>
    </div>

  
  `,
  styles: `
    .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  `
})
export class DashboardHeaderComponent {

      store=inject(DashboardService);
       
      widgetsOpen = signal(false);
  
      dashboard = viewChild.required<ElementRef>('dashboard');
      widgetPutBack(event: CdkDragDrop<number, any>){
          const {previousContainer} = event;
          this.store.removedWidget(previousContainer.data)
      }
      ngOnInit(){
        wrapGrid(this.dashboard().nativeElement, {duration: 300})
      }

  
      drop(event: CdkDragDrop<number,any>)
      {
        console.log("hello")
        const  {previousContainer, container, item:{data}} = event;
  
        if(data){
            this.store.insertWidgetAtPosition(data, container.data);
            return ;
        }
        this.store.updateWidgetPosition(previousContainer.data, container.data)
    
      }

}
