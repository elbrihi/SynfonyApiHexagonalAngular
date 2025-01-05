import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import { wrapGrid } from 'animate-css-grid';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Widget } from '../../model/dashboard';

@Component({
  selector: 'app-dashboard',
  template: `


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
        <app-widgets-panel cdkDropList (cdkDropListDropped)="widgetPutBack($event)"/>
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


      <!-- end dashboard header -->
    <div  cdkDropListGroup>

        <div #dashboard class="dashboard-widgets">
          @for (widget of  store.addedWidgets(); track widget.id)
          {
            <app-widget 
                    [data]="widget" 
                    cdkDropList 
                    (cdkDropListDropped)="drop($event)" 
                    [cdkDropListData]="widget.id"
            />
          }
       </div>
    </div>


  `,
  standalone: false,
  styles:`
  .dashboard-widgets{
    border: 1px solid rgb(86, 6, 155);
    display: grid;
   /**  grid-template-columns: repeat(4, 1fr); **/
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 150px;
    gap: 16px;

  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  `,

})
export class DashboardComponent {

    store=inject(DashboardService);
   
    dashboard = viewChild.required<ElementRef>('dashboard');
    widgetPutBack(event: CdkDragDrop<number, any>){
        const {previousContainer} = event;
        this.store.removedWidget(previousContainer.data)
    }
    ngOnInit(){
      wrapGrid(this.dashboard().nativeElement, {duration: 300})
    }

    widgetsOpen = signal(false);


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
