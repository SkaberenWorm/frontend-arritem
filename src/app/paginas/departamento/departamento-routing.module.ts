import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { DepartamentoViewComponent } from './departamento-view/departamento-view.component';

const routes: Routes = [
  {
    path: '',
    component: DepartamentoListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'listado',
    component: DepartamentoListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'new',
    component: DepartamentoFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: ':id/edit',
    component: DepartamentoFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: ':id/view',
    component: DepartamentoViewComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule {}
