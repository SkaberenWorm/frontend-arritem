import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthenticationService } from '../commons/services/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from '../store/actions';

declare const $: any;

// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

// Menu Items
export let ROUTES: RouteInfo[] = [];

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  nombreUsuario = '--';

  private menu_admin: RouteInfo[] = [
    {
      path: '/admin',
      title: 'Dashboard',
      type: 'link',
      icontype: 'dashboard'
    },
    {
      path: '/departamento',
      title: 'Departamentos',
      type: 'sub',
      icontype: 'apartment',
      collapse: 'departamentos',
      children: [
        { path: 'new', title: 'Nuevo Departamento', ab: '-' },
        { path: 'listado', title: 'Listado Departamentos', ab: '-' }
      ]
    },
    {
      path: '/admin/servicio',
      title: 'Servicios',
      type: 'sub',
      icontype: 'local_activity',
      collapse: 'servicios',
      children: [
        { path: 'new', title: 'Nuevo Servicio', ab: '-' },
        { path: 'listado', title: 'Listado de Servicios', ab: '-' }
      ]
    },
    {
      path: '/reserva',
      title: 'Reservas',
      type: 'sub',
      icontype: 'content_paste',
      collapse: 'reservas',
      children: [{ path: 'listado', title: 'Listado de reservas', ab: '-' }]
    },
    {
      path: '/admin/cliente',
      title: 'Clientes',
      type: 'sub',
      icontype: 'emoji_emotions',
      collapse: 'clientes',
      children: [
        { path: 'new', title: 'Nuevo Cliente', ab: '-' },
        { path: 'listado', title: 'Listado de clientes', ab: '-' }
      ]
    },
    {
      path: '/admin/usuario',
      title: 'Usuarios',
      type: 'sub',
      icontype: 'person',
      collapse: 'usuarios',
      children: [
        { path: 'new', title: 'Nuevo Usuario', ab: '-' },
        { path: 'listado', title: 'Listado de usuarios', ab: '-' }
      ]
    },
    {
      path: '/admin/mantencion',
      title: 'Mantenciones',
      type: 'sub',
      icontype: 'local_convenience_store',
      collapse: 'mantenciones',
      children: [
        { path: 'new', title: 'Nuevo Mantención', ab: '-' },
        { path: 'listado', title: 'Listado mantenciones', ab: '-' }
      ]
    }
  ];

  private menu_funcionario: RouteInfo[] = [
    {
      path: '/check',
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
      children: [
        { path: 'new', title: 'Nuevo Departamento', ab: '-' },
        { path: 'listado', title: 'Listado De Departamentos', ab: '-' }
      ]
    }
  ];

  constructor(
    private _authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this._authenticationService.esRol('Administrador')) {
      ROUTES = this.menu_admin;
    } else if (this._authenticationService.esRol('Funcionario')) {
      ROUTES = this.menu_funcionario;
    }

    this._authenticationService.cargarStorage();
    this.nombreUsuario =
      this._authenticationService.nombre.length > 0
        ? this._authenticationService.nombre
        : this._authenticationService.obtenerNombre();

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }
  salir() {
    this.authenticationService.logout();
  }
}
