import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { StoreComponent } from './modules/store/components/store.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'store', component: StoreComponent  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/store', pathMatch: 'full' },
  { path: '',  redirectTo: '/store', pathMatch: 'full' }, // catch all route

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
