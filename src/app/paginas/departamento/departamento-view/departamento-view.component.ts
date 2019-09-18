import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/commons/models/departamento.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../departamento.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento-view',
  templateUrl: './departamento-view.component.html',
  styles: []
})
export class DepartamentoViewComponent implements OnInit {
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
      } else {
        console.log('ENVIAR MENSAJE DE ERROR');
      }
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
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
        } else {
          this.errorSwal(result.mensaje);
        }
      });
    }
  }

  /**
   * Carga el formulario con los datos del departamento optenido
   */
  cargarFormulario() {
    if (this.departamento.nombre == null || this.departamento.nombre == undefined) {
      this.formulario.controls.nombre.setValue('No especificado');
    } else {
      this.formulario.controls.nombre.setValue(this.departamento.nombre);
    }

    this.formulario.controls.direccion.setValue(this.departamento.direccion);
    this.formulario.controls.tarifa.setValue(this.departamento.tarifa);
    if (this.departamento.estado == 'D') {
      this.formulario.controls.estado.setValue('Disponible');
    } else {
      this.formulario.controls.estado.setValue('En mantención');
    }

    this.formulario.controls.activo.setValue(this.departamento.activo);
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
