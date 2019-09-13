var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
var routes = [
    {
        path: '',
        component: DepartamentoListComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'listado',
        component: DepartamentoListComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'new',
        component: DepartamentoFormComponent,
        canActivate: [LoginGuard, RolAdminGuard]
    },
    {
        path: ':id/edit',
        component: DepartamentoFormComponent,
        canActivate: [LoginGuard, RolAdminGuard]
    }
];
var DepartamentoRoutingModule = /** @class */ (function () {
    function DepartamentoRoutingModule() {
    }
    DepartamentoRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], DepartamentoRoutingModule);
    return DepartamentoRoutingModule;
}());
export { DepartamentoRoutingModule };
//# sourceMappingURL=departamento-routing.module.js.map