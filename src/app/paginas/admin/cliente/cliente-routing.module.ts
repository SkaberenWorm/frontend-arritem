import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'cliente/listado',
    component: ClienteListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'cliente/new',
    component: ClienteFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'cliente/{id}/edit',
    component: ClienteFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
