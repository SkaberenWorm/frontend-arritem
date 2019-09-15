import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservaFormComponent } from './reserva-form/reserva-form.component';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ReservaListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'listado',
    component: ReservaListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'new',
    component: ReservaFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  },
  {
    path: ':id/edit',
    component: ReservaFormComponent,
    canActivate: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule {}
