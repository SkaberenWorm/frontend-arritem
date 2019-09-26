import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Servicio } from 'src/app/commons/models/servicio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css']
})
export class ServicioFormComponent implements OnInit {
  public servicio: Servicio = new Servicio();
  public loading = false;
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private servicioService: ServicioService,
    private router: Router,
    private alert: UtilAlertService
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo servicio o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.servicio.id = params['id'];
      }
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      //precio: new FormControl('', [Validators.required]),
      activo: new FormControl()
    });

    if (this.servicio.id > 0) {
      this.servicioService.getById(this.servicio.id).subscribe(result => {
        if (!result.error) {
          this.servicio = result.resultado;
          this.cargarFormulario();
        }
      });
    }
  }

  /**
   * Carga el formulario con los datos de servicio optenido
   */
  cargarFormulario() {
    this.formulario.controls.nombre.setValue(this.servicio.nombre);
    //this.formulario.controls.precio.setValue(this.servicio.precio);
  }

  /**
   * Carga los atributos del servicio con los datos ingresados
   */
  cargarServicio() {
    this.servicio.nombre = this.formulario.controls.nombre.value;
    //this.servicio.precio = this.formulario.controls.precio.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarServicio();
      let esnuevo = false;
      if (this.servicio.id < 1) {
        esnuevo = true;
      }
      this.servicioService.guardar(this.servicio).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          this.alert.successSwal(result.mensaje);
          if (esnuevo) {
            this.limpiarFormulario();
          }
        } else {
          this.loading = false;
          this.alert.errorSwal(result.mensaje);
        }
      });
    }
  }

  limpiarFormulario() {
    this.formulario.reset();
  }
}
