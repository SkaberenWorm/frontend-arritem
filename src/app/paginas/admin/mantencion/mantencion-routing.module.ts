import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { MantencionListComponent } from './mantencion-list/mantencion-list.component';
import { MantencionFormComponent } from './mantencion-form/mantencion-form.component';

const routes: Routes = [
  {
    path: 'mantencion',
    component: MantencionListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'mantencion/listado',
    component: MantencionListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'mantencion/new',
    component: MantencionFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'mantencion/:id/edit',
    component: MantencionFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantencionRoutingModule {}
