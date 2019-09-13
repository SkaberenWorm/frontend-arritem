var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthenticationService } from '../commons/services/authentication.service';
import { Store } from '@ngrx/store';
// Menu Items
export var ROUTES = [];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_authenticationService, store, authenticationService) {
        this._authenticationService = _authenticationService;
        this.store = store;
        this.authenticationService = authenticationService;
        this.nombreUsuario = '--';
        this.menu_admin = [
            {
                path: '/',
                title: 'Inicio',
                type: 'link',
                icontype: 'home'
            },
            {
                path: '/departamento',
                title: 'Departamentos',
                type: 'sub',
                icontype: 'grid_on',
                collapse: 'departamentos',
                children: [{ path: 'new', title: 'Nuevo Departamento', ab: '-' }, { path: 'listado', title: 'Listado De Departamentos', ab: '-' }]
            },
            {
                path: '/admin',
                title: 'Administración',
                type: 'sub',
                icontype: 'settings',
                collapse: 'settings',
                children: [
                    { path: 'sala', title: 'Salas', ab: '-' },
                    { path: 'piso', title: 'Pisos', ab: '-' },
                    { path: 'edificio', title: 'Edificios', ab: '-' }
                ]
            }
        ];
        this.menu_funcionario = [
            {
                path: '/',
                title: 'Inicio',
                type: 'link',
                icontype: 'home'
            },
            {
                path: '/departamento',
                title: 'Departamentos',
                type: 'sub',
                icontype: 'grid_on',
                collapse: 'departamentos',
                children: [{ path: 'new', title: 'Nuevo Departamento', ab: '-' }, { path: 'listado', title: 'Listado De Departamentos', ab: '-' }]
            },
            {
                path: '/admin',
                title: 'Administración',
                type: 'sub',
                icontype: 'settings',
                collapse: 'settings',
                children: [
                    { path: 'sala', title: 'Salas', ab: '-' },
                    { path: 'piso', title: 'Pisos', ab: '-' },
                    { path: 'edificio', title: 'Edificios', ab: '-' }
                ]
            }
        ];
        this.menu_cliente = [
            {
                path: '/',
                title: 'Inicio',
                type: 'link',
                icontype: 'home'
            },
            {
                path: '/departamento',
                title: 'Departamentos',
                type: 'sub',
                icontype: 'grid_on',
                collapse: 'departamentos',
                children: [{ path: 'listado', title: 'Listado De Departamentos', ab: '-' }]
            }
        ];
    }
    SidebarComponent.prototype.isMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    SidebarComponent.prototype.ngOnInit = function () {
        if (this._authenticationService.esRol('Administrador')) {
            ROUTES = this.menu_admin;
        }
        else if (this._authenticationService.esRol('Funcionario')) {
            ROUTES = this.menu_funcionario;
        }
        else {
            ROUTES = this.menu_cliente;
        }
        this._authenticationService.cargarStorage();
        // tslint:disable-next-line: max-line-length
        this.nombreUsuario =
            this._authenticationService.nombre.length > 0 ? this._authenticationService.nombre : this._authenticationService.obtenerName();
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
        //console.log(this.menuItems);
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    };
    SidebarComponent.prototype.updatePS = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            this.ps.update();
        }
    };
    SidebarComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    };
    SidebarComponent.prototype.salir = function () {
        this.authenticationService.logout();
    };
    SidebarComponent = __decorate([
        Component({
            selector: 'app-sidebar-cmp',
            templateUrl: 'sidebar.component.html'
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            Store,
            AuthenticationService])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map