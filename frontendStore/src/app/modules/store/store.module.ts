import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { StoreComponent } from "./components/store.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../shared/material.module";


import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from "../../layout/containers/main-layout/main-layout.component";
import { MenuComponent } from "../../layout/components/menu/menu.component";
import { HeaderComponent } from "../../layout/components/header/header.component";
import { LoginComponent } from "../auth/components/login/login.component";
import { ModelModule } from "./model.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        MainLayoutComponent,
        StoreComponent,
        HeaderComponent,
        MenuComponent,
        LoginComponent
    ],
    imports:[
        RouterModule,
        ModelModule,
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers:[],
    exports: [
        MainLayoutComponent,
        StoreComponent,
        HeaderComponent,
        MenuComponent,
        LoginComponent
    ],

})

export class StoreModule
{
    public constructor()
    {
        console.log("StoreModule");
    }
}