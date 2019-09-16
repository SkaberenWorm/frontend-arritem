import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './cliente.service';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, ClienteRoutingModule, MatProgressSpinnerModule],
  declarations: [ClienteListComponent, ClienteFormComponent],
  providers: [ClienteService]
})
export class ClienteModule {}
