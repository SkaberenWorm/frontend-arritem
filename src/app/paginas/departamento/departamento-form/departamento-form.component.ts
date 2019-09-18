import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService } from '../departamento.service';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/commons/models/departamento.model';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styles: []
})
export class DepartamentoFormComponent implements OnInit {
  public departamento: Departamento = new Departamento();
  public loading = false;
  public formulario: FormGroup;
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(
    private activadedRouter: ActivatedRoute,
    private departamentoService: DepartamentoService,
    private config: NgbCarouselConfig
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo departamento o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.departamento.id = params['id'];
      }
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      direccion: new FormControl('', [Validators.required]),
      tarifa: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      activo: new FormControl()
    });

    if (this.departamento.id > 0) {
      this.departamentoService.getById(this.departamento.id).subscribe(result => {
        if (!result.error) {
          this.departamento = result.resultado;
          this.cargarFormulario();
        }
      });
    }
  }

  /**
   * Carga el formulario con los datos del departamento optenido
   */
  cargarFormulario() {
    this.formulario.controls.nombre.setValue(this.departamento.nombre);
    this.formulario.controls.direccion.setValue(this.departamento.direccion);
    this.formulario.controls.tarifa.setValue(this.departamento.tarifa);
    this.formulario.controls.estado.setValue(this.departamento.estado);
    this.formulario.controls.activo.setValue(this.departamento.activo);
  }

  cargarDepartamento() {
    this.departamento.nombre = this.formulario.controls.nombre.value;
    this.departamento.direccion = this.formulario.controls.direccion.value;
    this.departamento.estado = this.formulario.controls.estado.value;
    this.departamento.tarifa = this.formulario.controls.tarifa.value;
    this.departamento.activo = this.formulario.controls.activo.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarDepartamento();
      let esnuevo = false;
      if (this.departamento.id < 1) {
        esnuevo = true;
      }
      this.departamentoService.guardar(this.departamento).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          Swal.fire({
            title: 'Exito',
            type: 'success',
            text: result.mensaje
          });
          if (esnuevo) {
            this.limpiarFormulario();
          }
        } else {
          this.loading = false;
          Swal.fire({
            title: 'Fallo',
            type: 'error',
            text: result.mensaje
          });
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        html: '<b>Los campos en rojo son obligatorios</b>',
        showConfirmButton: false,
        timer: 2000,
        width: 250
      });
    }
  }

  limpiarFormulario() {
    this.formulario.reset();
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
