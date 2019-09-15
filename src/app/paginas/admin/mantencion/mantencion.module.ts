import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantencionService } from './mantencion.service';
import { MantencionRoutingModule } from './mantencion-routing.module';
import { MantencionListComponent } from './mantencion-list/mantencion-list.component';
import { MantencionFormComponent } from './mantencion-form/mantencion-form.component';

@NgModule({
  imports: [CommonModule, MantencionRoutingModule],
  declarations: [MantencionListComponent, MantencionFormComponent],
  providers: [MantencionService]
})
export class MantencionModule {}
