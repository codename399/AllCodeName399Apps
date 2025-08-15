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
import { RoleComponent } from './components/home/components/role/role.component';
import { UserComponent } from './components/home/components/user/user.component';
import { ProjectComponent } from './components/home/components/project/project.component';
import { RoleResolver } from './components/home/resolvers/role-resolver';
import { UserResolver } from './components/home/resolvers/user-resolver';
import { ProjectResolver } from './components/home/resolvers/project-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent:()=>import('../app/components/authentication/components/login-component/login-component').then(c=>c.LoginComponent),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    loadComponent:()=>import('../app/components/home/components/home/home.component').then(c=>c.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'change-password',
        loadComponent:()=>import('../app/components/home/components/change-password/change-password.component').then(c=>c.ChangePasswordComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'register/:id',
        loadComponent:()=>import('../app/components/authentication/components/register/register.component').then(c=>c.RegisterComponent),
        canActivate: [AuthGuard],
        resolve: {
          users: RegisterResolver,
        },
      },
      {
        path: 'dashboard',
        loadComponent:()=>import('../app/components/home/components/dashboard/dashboard.component').then(c=>c.DashboardComponent),
        canActivate: [AuthGuard],
        resolve: {
          projects: DashboardResolver,
        },
      },
      {
        path: 'manage-roles',
        loadComponent:()=>import('../app/components/home/components/role/role.component').then(c=>c.RoleComponent),
        canActivate: [AuthGuard],
        resolve: {
          pagedResponse: RoleResolver,
        },
      },
      {
        path: 'manage-users',
        loadComponent:()=>import('../app/components/home/components/user/user.component').then(c=>c.UserComponent),
        canActivate: [AuthGuard],
        resolve: {
          pagedResponse: UserResolver,
        },
      },
      {
        path: 'manage-projects',
        loadComponent:()=>import('../app/components/home/components/project/project.component').then(c=>c.ProjectComponent),
        canActivate: [AuthGuard],
        resolve: {
          pagedResponse: ProjectResolver,
        },
      },
    ],
  },
  {
    path: 'register',
    loadComponent:()=>import('../app/components/authentication/components/register/register.component').then(c=>c.RegisterComponent),
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
