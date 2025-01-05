import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';
import { DemoMaterialModule } from './shared/material-module';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ContentComponent } from './pages/content/content.component';
import { WidgetOptionsComponent } from './components/widget/widget-options/widget-options.component';
import { SubscribersComponent } from './pages/dashboard/widgets/subscribers.component';
import { WidgetComponent } from './components/widget/widget.component';
import { WatchTimeComponent } from './pages/dashboard/widgets/watch-time.component';
import { RevenueComponent } from './pages/dashboard/widgets/revenue.component';
import { ViewsComponent } from './pages/dashboard/widgets/views.component';
import { WidgetsPanelComponent } from './pages/dashboard/widgets-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomSidenavComponent,
    DashboardComponent,
    AnalyticsComponent,
    CommentsComponent,
    ContentComponent,
    WidgetOptionsComponent,
    SubscribersComponent,
    ViewsComponent,
    WidgetOptionsComponent,
    WidgetComponent,
    WatchTimeComponent,
    RevenueComponent,
    WidgetsPanelComponent,
    DashboardHeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    DemoMaterialModule,
    NgComponentOutlet,
    CdkDropList, CdkDrag

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
