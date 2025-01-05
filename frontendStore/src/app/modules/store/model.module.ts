import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";


import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [

    ],
    imports:[
       
    ],
    providers:[],
    exports: [

    ],

})

export class ModelModule
{
    public constructor()
    {
        console.log("ModelModule");
    }
}