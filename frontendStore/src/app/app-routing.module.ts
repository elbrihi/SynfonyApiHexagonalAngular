import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/store/components/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LogoutComponent } from './modules/auth/components/logout/logout.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { VediosComponent } from './pages/vedios.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ContentComponent } from './pages/content/content.component';
import { StoreComponent } from './modules/store/store.component';
import { AuthGuardService } from './core/guards/auth.guard.service';
import { SupplierListComponent } from './modules/supplier/components/supplier-list/supplier-list.component';
import { CategoryListComponent } from './modules/product/components/category-list/category-list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store', // Default redirect to 'store'
    
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'store', 
    component: StoreComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'content',
        component: ContentComponent,
        children: [
          {
            path: 'vedios', // Correct spelling
            component: VediosComponent // Ensure the component name matches
          },
          {
            path: 'analytics',
            component: AnalyticsComponent
          }
        ]
      },
      {
        path: 'supplier',
        component: SupplierListComponent,
        children: [
          {
            path: 'supplier', // Correct spelling
            component: VediosComponent // Ensure the component name matches
          },
          {
            path: 'analytics',
            component: AnalyticsComponent
          }
        ]
      },
      {
        path: 'category',
        component: CategoryListComponent,
        children: [
          {
            path: 'category', // Correct spelling
            component: CategoryListComponent // Ensure the component name matches
          },
          {
            path: 'analytics',
            component: AnalyticsComponent
          }
        ]
      },
      {
        path: 'comments',
        component: CommentsComponent
      }
    ]
  },
  { 
    path: 'logout', 
    component: LogoutComponent 
  },
  { 
    path: '**', 
    redirectTo: 'store' // Catch-all route at the end
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
