import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/commons/models/cliente.model';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  public listaClientes: Array<ClienteModel>;
  public loading = true;
  constructor(private clienteService: ClienteService) {}

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

  errorSwal(mensaje: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      text: mensaje
    });
  }

  successSwal(mensaje: string) {
    Swal.fire({
      title: 'Hecho!',
      type: 'success',
      text: mensaje
    });
  }
}
