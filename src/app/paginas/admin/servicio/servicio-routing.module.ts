import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { ServicioListComponent } from './servicio-list/servicio-list.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';

const routes: Routes = [
  {
    path: 'servicio',
    component: ServicioListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'servicio/listado',
    component: ServicioListComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'servicio/new',
    component: ServicioFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: 'servicio/:id/edit',
    component: ServicioFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule {}
