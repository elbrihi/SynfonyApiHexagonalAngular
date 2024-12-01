import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
    imports: [
      CommonModule,
      MatButtonModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatMenuModule ,
      MatToolbarModule,
      MatExpansionModule,
      MatMenuModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule   ,
      MatButtonModule,
    ],
    exports: [
      MatButtonModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule, 
      MatExpansionModule,
      MatToolbarModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule   ,
      MatButtonModule,
    ]
  
})
export class MaterialModule
{
    constructor(){
        console.log('hello material')      
    }
}