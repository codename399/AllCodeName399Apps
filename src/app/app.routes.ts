import { Routes } from '@angular/router';
import { AuthGuard } from '../route-guards/auth-guard';
import { NoAuthGuard } from '../route-guards/no-auth-guard';
import { LoginComponent } from './components/authentication/components/login-component/login-component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { RegisterResolver } from './components/authentication/resolvers/register-resolver';
import { ChangePasswordComponent } from './components/home/components/change-password/change-password.component';
import { DashboardComponent } from './components/home/components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/components/home/home.component';
import { DashboardResolver } from './components/home/resolvers/dashboard-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch:'full'
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'register/:id',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        resolve: {
          users: RegisterResolver,
        },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        resolve:{
          projects:DashboardResolver
        }
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
