import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { ReservaViewComponent } from './reserva-view/reserva-view.component';
import { ReservaFormComponent } from './reserva-form/reserva-form.component';

@NgModule({
  declarations: [ReservaListComponent, ReservaViewComponent, ReservaFormComponent],
  imports: [CommonModule, ReservaRoutingModule]
})
export class ReservaModule {}
