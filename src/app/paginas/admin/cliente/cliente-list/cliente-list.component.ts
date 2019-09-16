import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/commons/models/cliente.model';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  public listaClientes: Array<ClienteModel>;
  public loading = true;
  public clienteFilter = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.clienteService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        this.listaClientes = result.resultado;
      } else {
        this.errorSwal(result.mensaje);
      }
    });
  }

  filtrarProducto(input: string) {
    console.log(input);
  }
  errorSwal(mensaje: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      text: mensaje
    });
  }

  newClient() {
    this.router.navigate(['/admin/cliente/new']);
  }

  successSwal(mensaje: string) {
    Swal.fire({
      title: 'Hecho!',
      type: 'success',
      text: mensaje
    });
  }
}
