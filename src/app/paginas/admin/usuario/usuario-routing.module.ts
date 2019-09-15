import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'usuario/listado',
    component: UsuarioListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'usuario/new',
    component: UsuarioFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'usuario/{id}/edit',
    component: UsuarioFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}
