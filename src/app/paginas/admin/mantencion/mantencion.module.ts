import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantencionService } from './mantencion.service';
import { MantencionRoutingModule } from './mantencion-routing.module';
import { MantencionListComponent } from './mantencion-list/mantencion-list.component';
import { MantencionFormComponent } from './mantencion-form/mantencion-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MantencionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonsServiceModule,
    MatOptionModule,
    MatSelectModule,
    NgbDatepickerModule
  ],
  declarations: [MantencionListComponent, MantencionFormComponent],
  providers: [MantencionService]
})
export class MantencionModule {}
