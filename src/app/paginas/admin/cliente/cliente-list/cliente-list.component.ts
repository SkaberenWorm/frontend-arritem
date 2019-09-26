import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/commons/models/cliente.model';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VerUsuarioModalComponent } from 'src/app/commons/components/ver-usuario-modal/ver-usuario-modal.component';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  public listaClientes: Array<Cliente>;
  public loading = true;
  public clienteFilter = '';

  @ViewChild(VerUsuarioModalComponent, { static: false })
  verDetalleClienteModal: VerUsuarioModalComponent;
  constructor(private clienteService: ClienteService, private router: Router, private alert: UtilAlertService) {}

  ngOnInit() {
    this.cargarData();
  }

  /**
   * Abre una ventana modal y muestra el detalle de un cliente
   * @param cliente
   */
  verDetalleCliente(cliente: Cliente) {
    this.verDetalleClienteModal.open(cliente);
  }

  cargarData() {
    this.clienteService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        this.listaClientes = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  }

  filtrarCliente(input: string) {
    console.log(input);
  }

  cambiarEstadoCliente(cliente: Cliente) {
    let accion = '';
    if (cliente.activo) {
      accion = 'Deshabilita';
    } else {
      accion = 'Habilita';
    }
    Swal.fire({
      title: '¿Seguro?',
      text: 'El cliente quedará ' + accion.toLowerCase() + 'do!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ' + accion + 'r!'
    }).then(result => {
      if (result.value) {
        cliente.activo = !cliente.activo;
        this.guardarCliente(cliente);
      }
    });
  }

  guardarCliente(cliente: Cliente) {
    this.clienteService.guardar(cliente).subscribe(result => {
      if (result.error) {
        if (!cliente.activo) {
          this.alert.errorSwal('Error al habilitar al cliente');
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      }
    });
  }

  newClient() {
    this.router.navigate(['/admin/cliente/new']);
  }
}
