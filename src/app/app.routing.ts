import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginGuard } from './commons/guards/login.guard';
import { RolAdminGuard } from './commons/guards/rol-admin.guard';
import { GeneralLayoutComponent } from './layouts/general/general-layout.component';
import { RolAdminAndFuncionarioGuard } from './commons/guards/rol-admin-and-funcionario.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    loadChildren: './paginas/login/login.module#LoginModule'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: './paginas/admin/admin.module#AdminModule',
    canLoad: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'check',
    component: AdminLayoutComponent,
    loadChildren: './paginas/check/check.module#CheckModule',
    canLoad: [LoginGuard, RolAdminAndFuncionarioGuard]
  },
  {
    path: 'departamento',
    component: GeneralLayoutComponent,
    loadChildren: './paginas/departamento/departamento.module#DepartamentoModule',
    canLoad: [LoginGuard, RolAdminAndFuncionarioGuard]
  },
  {
    path: 'reserva',
    component: GeneralLayoutComponent,
    loadChildren: './paginas/reserva/reserva.module#ReservaModule',
    canLoad: [LoginGuard, RolAdminAndFuncionarioGuard]
  }
];
