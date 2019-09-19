import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Mantencion } from 'src/app/commons/models/mantencion.model';
import { MantencionService } from '../mantencion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantencion-list',
  templateUrl: './mantencion-list.component.html',
  styleUrls: ['./mantencion-list.component.css']
})
export class MantencionListComponent implements OnInit {
  public listaMantenciones: Array<Mantencion> = [];
  public loading = true;
  public mantencionFilter = '';

  constructor(private mantencionService: MantencionService, private router: Router) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.mantencionService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        this.listaMantenciones = result.resultado;
      } else {
        this.warningSwal(result.mensaje);
      }
    });
  }

  filtrarMantencion(input: string) {
    console.log(input);
  }

  cambiarEstadoMantencion(mantencion: Mantencion) {
    let accion = '';
    if (mantencion.activo) {
      accion = 'Deshabilita';
    } else {
      accion = 'Habilita';
    }
    Swal.fire({
      title: '¿Seguro?',
      text: 'El mantención quedará ' + accion.toLowerCase() + 'do!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ' + accion + 'r!'
    }).then(result => {
      if (result.value) {
        mantencion.activo = !mantencion.activo;
        this.guardarMantencion(mantencion);
      }
    });
  }

  guardarMantencion(mantencion: Mantencion) {
    this.mantencionService.guardar(mantencion).subscribe(result => {
      if (result.error) {
        if (!mantencion.activo) {
          this.errorSwal('Error al habilitar la mantención');
        } else {
          this.errorSwal(result.mensaje);
        }
      }
    });
  }
  newClient() {
    this.router.navigate(['/admin/mantencion/new']);
  }

  errorSwal(mensaje: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      text: mensaje
    });
  }

  warningSwal(mensaje: string) {
    Swal.fire({
      type: 'warning',
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
