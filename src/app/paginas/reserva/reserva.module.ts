import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { ReservaViewComponent } from './reserva-view/reserva-view.component';
import { ReservaFormComponent } from './reserva-form/reserva-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ReservaListComponent, ReservaViewComponent, ReservaFormComponent],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonsServiceModule,
    NgbCarouselModule,
    MatSelectModule,
    NgxPaginationModule,
    NgbPaginationModule
  ]
})
export class ReservaModule {}
