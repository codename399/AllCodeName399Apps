import { Routes } from '@angular/router';
import { LoginComponent } from '../authentication/components/login-component/login-component';
import { HomeComponent } from '../home/home/home.component';
import { NoAuthGuard } from '../route-guards/no-auth-guard';
import { AuthGuard } from '../route-guards/auth-guard';
import { RegisterComponent } from '../authentication/components/register/register.component';
import { ChangePasswordComponent } from '../home/change-password/change-password.component';
import { RegisterResolver } from '../authentication/resolvers/register-resolver';
import { DashboardComponent } from '../home/dashboard/dashboard.component';
import { DashboardResolver } from '../home/resolvers/dashboard-resolver';

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
