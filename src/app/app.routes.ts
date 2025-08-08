import { Routes } from '@angular/router';
import { LoginComponent } from '../authentication/components/login-component/login-component';
import { HomeComponent } from '../home/home/home.component';
import { NoAuthGuard } from '../route-guards/no-auth-guard';
import { AuthGuard } from '../route-guards/auth-guard';
import { RegisterComponent } from '../authentication/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
