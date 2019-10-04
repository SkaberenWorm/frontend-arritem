import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Departamento } from 'src/app/commons/models/departamento.model';
import { DepartamentoService } from '../departamento.service';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: []
})
export class DepartamentoListComponent implements OnInit {
  public listaDepartamentos: Array<Departamento>;
  public loading = true;
  public departamentoFilter = '';

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private alert: UtilAlertService
  ) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.departamentoService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        console.log(result.resultado);
        this.listaDepartamentos = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  }

  filtrarDepartamento(input: string) {
    console.log(input);
  }

  cambiarEstadoDepartamento(departamento: Departamento) {
    let accion = '';
    if (departamento.activo) {
      accion = 'Deshabilita';
    } else {
      accion = 'Habilita';
    }
    Swal.fire({
      title: '¿Seguro?',
      text: 'El departamento quedará ' + accion.toLowerCase() + 'do!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ' + accion + 'r!'
    }).then(result => {
      if (result.value) {
        departamento.activo = !departamento.activo;
        this.guardarDepartamento(departamento);
      }
    });
  }

  guardarDepartamento(departamento: Departamento) {
    this.departamentoService.guardar(departamento).subscribe(result => {
      if (result.error) {
        if (!departamento.activo) {
          this.alert.errorSwal('Error al habilitar al departamento');
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      }
    });
  }

  newDepartamento() {
    this.router.navigate(['/departamento/new']);
  }
}
