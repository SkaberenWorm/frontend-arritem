import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from './servicio.service';
import { ServicioRoutingModule } from './servicio-routing.module';
import { ServicioListComponent } from './servicio-list/servicio-list.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';

@NgModule({
  imports: [CommonModule, ServicioRoutingModule],
  declarations: [ServicioListComponent, ServicioFormComponent],
  providers: [ServicioService]
})
export class ServicioModule {}
