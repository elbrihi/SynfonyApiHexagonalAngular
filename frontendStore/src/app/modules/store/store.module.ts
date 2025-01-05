import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";


import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { ModelModule } from "./model.module";
import { VideoComponent } from "../../pages/video/video.component";
import { MenuItemComponent } from "../../layout/components/menu-item/menu-item.component";

import { WidgetComponent } from "../../layout/components/widget/widget.component";
import { WidgetOptionsComponent } from "../../layout/components/widget/widget-options/widget-options.component";

import { ContentComponent } from "../../pages/content/content.component";
import { CommentsComponent } from "../../pages/comments/comments.component";
import { AnalyticsComponent } from "../../pages/analytics/analytics.component";

import { CustomSidenavComponent } from "../../layout/components/custom-sidenav/custom-sidenav.component";
import { DemoMaterialModule } from "../../shared/material-module";
import { DashboardHeaderComponent } from "./components/dashboard/dashboard-header/dashboard-header.component";
import { SubscribersComponent } from "./components/dashboard/widgets/subscribers.component";
import { ViewsComponent } from "./components/dashboard/widgets/views.component";
import { WatchTimeComponent } from "./components/dashboard/widgets/watch-time.component";
import { RevenueComponent } from "./components/dashboard/widgets/revenue.component";
import { WidgetsPanelComponent } from "./components/dashboard/widgets-panel.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { StoreComponent } from "./store.component";
import { LoginComponent } from "../auth/components/login/login.component";
import { LogoutComponent } from "../auth/components/logout/logout.component";
import { MainLayoutComponent } from "../../layout/containers/main-layout/main-layout.component";


@NgModule({
    declarations: [
        CustomSidenavComponent,
        LoginComponent,
        LogoutComponent,
        MainLayoutComponent,
        StoreComponent,
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
        DashboardHeaderComponent,
        MenuItemComponent,
        VideoComponent
    ],
    imports:[
        RouterModule,
        ModelModule,
        DemoMaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
     
    ],
    providers:[

   
    ],
    exports: [
        CustomSidenavComponent,
        DashboardHeaderComponent,
        MainLayoutComponent,
        LoginComponent,
        LogoutComponent,
        StoreComponent,
        DashboardComponent,
        AnalyticsComponent,
        CommentsComponent,
        ContentComponent,
        WidgetOptionsComponent,
        SubscribersComponent,
        ViewsComponent,
        WidgetComponent,
        WatchTimeComponent,
        RevenueComponent,
        WidgetsPanelComponent,
        DashboardHeaderComponent,
        MenuItemComponent,
        VideoComponent
    ],

})

export class StoreModule
{
    public constructor()
    {
        console.log("StoreModule");
    }
}