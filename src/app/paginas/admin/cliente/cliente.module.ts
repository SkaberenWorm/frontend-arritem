import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './cliente.service';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { MaterialModule } from 'src/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonsServiceModule,
    MaterialModule
  ],
  declarations: [ClienteListComponent, ClienteFormComponent],
  providers: [ClienteService]
})
export class ClienteModule {}
