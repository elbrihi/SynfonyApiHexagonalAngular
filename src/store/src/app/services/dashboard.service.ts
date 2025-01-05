import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views.component';
import { Widget } from '../model/dashboard';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue.component';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time.component';
import { AnalyticsComponent } from '../pages/analytics/analytics.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  widgets = signal<Widget[]> ([
    {
      id: 1,
      label: 'Subscriber',
      content: SubscribersComponent,
      rows: 1,
      columns: 2,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
      
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor:  '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 3,
      label: 'Revenue',
      content: RevenueComponent,
      rows: 1,
      columns: 1,
      backgroundColor:  '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 4,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor:  '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,

    }
  ]) 

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {

    const addedIds = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id))
  });

  addWidget(w: Widget)
  {
    this.addedWidgets.set([...this.addedWidgets(),{...w}])
  }
  

  updateWidget(id: number, widget: Partial<Widget>){
  
    const index = this.addedWidgets().findIndex(w => w.id === id)
   
    if(index != -1){
      const newWidgests = [...this.addedWidgets()];
      newWidgests[index] = { ...newWidgests[index], ...widget};
      this.addedWidgets.set(newWidgests);
    }


  }
  moveWidgetToRight(id: number)
  {
    
    const index = this.addedWidgets().findIndex(w => w.id === id)
    console.log(index)
    if(index == this.addedWidgets().length - 1){
      return ;
    }
    const newWidgests = [...this.addedWidgets()];
    [newWidgests[index], newWidgests[index+1]] = [{...newWidgests[index+1]}, {...newWidgests[index]}]
    
    this.addedWidgets.set(newWidgests)
  }

  moveWidgetToLeft(id: number)
  {
    const index =this.addedWidgets().findIndex(w => w.id === id)
   
    if(index == 0){
      return ;
    }
    const newWidgests = [...this.addedWidgets()];
    [newWidgests[index], newWidgests[index-1]] = [{...newWidgests[index-1]}, {...newWidgests[index]}]
    this.addedWidgets.set(newWidgests)
  }
  removedWidget(id: number)
  {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id ))
  }

  insertWidgetAtPosition(sourceWidgetId: number, desWidgetId: number){
      
    const widgetsToAdd = this.widgetsToAdd().find((w) => w.id ===sourceWidgetId )
    
    if(!widgetsToAdd){
      return ;
    }

      const indexOfDestWidget = this.addedWidgets().findIndex(
        (w) => w.id === desWidgetId
      );

      const postionToAdd = indexOfDestWidget === -1 ? this.addedWidgets().length : indexOfDestWidget;

      const newWidgets = [...this.addedWidgets()];

      console.log( )
      newWidgets.splice(postionToAdd, 0, widgetsToAdd);
      this.addedWidgets.set(newWidgets);

  
  }


  fetchWidgets()
  {
    const widgetsAsString = localStorage.getItem('dashboardWidgwets')
    
    console.log(widgetsAsString)
    if(widgetsAsString)
    {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
         const content = this.widgets().find(w => w.id === widget.id)?.content;

         if(content){
          widget.content = content;
         }

         this.addedWidgets.set(widgets);
      })
    }
  }
  constructor() {
    console.log( this.fetchWidgets())
    this.fetchWidgets()
  }
  

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w =>({...w}));

    widgetsWithoutContent.forEach(w =>{
      delete w.content
    });

    localStorage.setItem('dashboardWidgwets', JSON.stringify(widgetsWithoutContent))

  })
  updateWidgetPosition(sourceWidgetID: number, targetWidgetId: number)
  {
      const sourceIndex=  this.addedWidgets().findIndex(
        (w ) =>w.id === sourceWidgetID
      );

      if(sourceIndex === -1){
        return;
      }

      const newWidgets = [...this.addedWidgets()];
      const sourceWdget = newWidgets.splice(sourceIndex, 1)[0];

      const targetIndex = newWidgets.findIndex((w) => w.id ===targetWidgetId)

      if(targetIndex === -1){
        return ;
      }
      newWidgets.splice(targetIndex, 0 ,sourceWdget)
      this.addedWidgets.set(newWidgets)
  
  }
}
