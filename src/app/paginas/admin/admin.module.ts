import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { ServicioModule } from './servicio/servicio.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MantencionModule } from './mantencion/mantencion.module';

@NgModule({
  declarations: [AdminIndexComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ServicioModule,
    MantencionModule,
    UsuarioModule,
    ClienteModule
  ]
})
export class AdminModule {}
