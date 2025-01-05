import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';

import { wrapGrid } from 'animate-css-grid';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  template: `

<!--- cdkDropListGroup   ---->
    <div cdkDropListGroup>
      <app-dashboard-header />

      <div  >

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
