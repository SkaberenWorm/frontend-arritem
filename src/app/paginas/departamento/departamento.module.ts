import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { DepartamentoViewComponent } from './departamento-view/departamento-view.component';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
import { DepartamentoService } from './departamento.service';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { NgbCarouselModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgFallbackModule } from 'ngx-img-fallback';

@NgModule({
  declarations: [DepartamentoListComponent, DepartamentoViewComponent, DepartamentoFormComponent],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonsServiceModule,
    NgbCarouselModule,
    MatSelectModule,
    ImgFallbackModule,
    NgbPaginationModule
  ],
  providers: [DepartamentoService]
})
export class DepartamentoModule {}
