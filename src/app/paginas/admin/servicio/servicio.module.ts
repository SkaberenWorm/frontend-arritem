import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from './servicio.service';
import { ServicioRoutingModule } from './servicio-routing.module';
import { ServicioListComponent } from './servicio-list/servicio-list.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ServicioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonsServiceModule
  ],
  declarations: [ServicioListComponent, ServicioFormComponent],
  providers: [ServicioService]
})
export class ServicioModule {}
