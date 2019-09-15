import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
  imports: [CommonModule, UsuarioRoutingModule],
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  providers: [UsuarioService]
})
export class UsuarioModule {}
