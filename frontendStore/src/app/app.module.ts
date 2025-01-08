import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';

import { StoreModule } from './modules/store/store.module';
import { DemoMaterialModule } from './shared/material-module';
import { VediosComponent } from './pages/vedios.component';
import { TestComponent } from './layout/components/header/test/test.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    VediosComponent,
    TestComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    AppRoutingModule,
    DemoMaterialModule,
    NgComponentOutlet,
    CdkDropList, CdkDrag, MatTableModule, MatPaginatorModule, MatSortModule,
    


  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
