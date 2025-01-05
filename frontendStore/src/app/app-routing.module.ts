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


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store' // Default redirect to 'store'
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




/*const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'logout', 
    component: LogoutComponent 
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      {
        path: 'videos',
        component: VediosComponent
      }
    ]
  },
  {
    path: 'comments',
    component: CommentsComponent
  },
  // Wildcard route for a 404 page or fallback
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];
*/