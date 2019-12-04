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
  public listaDepartamentos: Array<Departamento> = [];
  private listaTemporal: Array<Departamento> = [];
  public departamentoFilter: Departamento = new Departamento();
  public loading = true;

  public page = 1;
  public pageSize = 10;
  public totalElements = 0;

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private alert: UtilAlertService
  ) {}

  ngOnInit() {
    //this.cargarData();
    this.listarDepartamentos();
  }

  /**
   * Listamos la primera página de departamentos
   */
  listarDepartamentos(event?) {
    this.loading = true;
    this.departamentoService
      .listWithSearchAndPagination(this.departamentoFilter, this.page, this.pageSize)
      .subscribe(result => {
        if (!result.error) {
          let listaDepartamentosTmp: Array<Departamento> = [];
          listaDepartamentosTmp = result.resultado.content;
          this.totalElements = result.resultado.totalElements;
          if (this.departamentoFilter.direccion.length > 0) {
            this.listaDepartamentos = [];
          }
          this.agregarDepartamentos(listaDepartamentosTmp);
        } else {
          this.alert.warningSwal(result.mensaje);
        }
        this.loading = false;
        if (event != null) {
          event.target.complete();
        }
      });
  }

  /**
   * Agregamos los departamentos a la lista
   * @param departamentos
   */
  agregarDepartamentos(departamentos: Array<Departamento>) {
    this.listaDepartamentos = [];
    departamentos.forEach(depto => {
      this.listaDepartamentos
      this.listaDepartamentos.push(depto);
      this.listaTemporal.push(depto);
    });
  }

  /* cargarData() {
    this.departamentoService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        console.log(result.resultado);
        this.listaDepartamentos = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  } */

  filtrarDepartamento(depto: string) {
    this.page = 1;

    if (depto.length > 0) {
      this.departamentoFilter = new Departamento({ direccion: depto });
    } else {
      this.departamentoFilter = new Departamento({ direccion: '' });
    }
    this.listaDepartamentos = [];
    this.listarDepartamentos();
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
