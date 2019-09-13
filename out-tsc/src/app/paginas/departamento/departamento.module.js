var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { DepartamentoViewComponent } from './departamento-view/departamento-view.component';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
var DepartamentoModule = /** @class */ (function () {
    function DepartamentoModule() {
    }
    DepartamentoModule = __decorate([
        NgModule({
            declarations: [DepartamentoListComponent, DepartamentoViewComponent, DepartamentoFormComponent],
            imports: [
                CommonModule,
                DepartamentoRoutingModule
            ]
        })
    ], DepartamentoModule);
    return DepartamentoModule;
}());
export { DepartamentoModule };
//# sourceMappingURL=departamento.module.js.map