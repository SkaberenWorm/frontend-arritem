import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { MaterialModule } from 'src/app/app.module';
import { RolService } from './rol.service';

@NgModule({
  imports: [CommonModule, UsuarioRoutingModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonsServiceModule, MaterialModule],
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  providers: [UsuarioService, RolService]
})
export class UsuarioModule {}
