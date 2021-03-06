import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/commons/models/usuario.model';
import { VerUsuarioModalComponent } from 'src/app/commons/components/ver-usuario-modal/ver-usuario-modal.component';
import { UsuarioService } from '../../usuario/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  public listaUsuarios: Array<Usuario>;
  public loading = true;
  public usuarioFilter = '';

  @ViewChild(VerUsuarioModalComponent, { static: false })
  verDetalleUsuarioModal: VerUsuarioModalComponent;
  constructor(private usuarioService: UsuarioService, private router: Router, private alert: UtilAlertService) {}

  ngOnInit() {
    this.cargarData();
  }

  /**
   * Abre una ventana modal y muestra el detalle de un usuario
   * @param usuario
   */
  verDetalleUsuario(usuario: Usuario) {
    this.verDetalleUsuarioModal.open(usuario);
  }

  cargarData() {
    this.usuarioService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        this.listaUsuarios = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  }

  filtrarUsuario(input: string) {
    console.log(input);
  }

  cambiarEstadoUsuario(usuario: Usuario) {
    let accion = '';
    if (usuario.activo) {
      accion = 'Deshabilita';
    } else {
      accion = 'Habilita';
    }
    Swal.fire({
      title: '¿Seguro?',
      text: 'El usuario quedará ' + accion.toLowerCase() + 'do!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ' + accion + 'r!'
    }).then(result => {
      if (result.value) {
        usuario.activo = !usuario.activo;
        this.guardarUsuario(usuario);
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.guardar(usuario).subscribe(result => {
      if (result.error) {
        if (!usuario.activo) {
          this.alert.errorSwal('Error al habilitar al usuario');
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      }
    });
  }
  newUser() {
    this.router.navigate(['/admin/usuario/new']);
  }
}
