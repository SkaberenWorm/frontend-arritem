import { Component, OnInit } from '@angular/core';
import { Mantencion } from 'src/app/commons/models/mantencion.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantencionService } from '../mantencion.service';
import { Util } from 'src/app/commons/util/util';
import Swal from 'sweetalert2';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TipoMantencion } from 'src/app/commons/models/tipo-mantencion.model';

@Component({
  selector: 'app-mantencion-form',
  templateUrl: './mantencion-form.component.html',
  styleUrls: ['./mantencion-form.component.css']
})
export class MantencionFormComponent implements OnInit {
  mantencion: Mantencion = new Mantencion();
  loading = false;
  formulario: FormGroup;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  listaTipoMantenciones: Array<TipoMantencion> = [];

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private mantencionService: MantencionService,
    private router: Router,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo mantencion o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.mantencion.id = params['id'];
      }
    });
    config.minDate = {
      year: moment().get('year'),
      month: moment().get('month') + 1,
      day: 1
    };
    config.maxDate = { year: moment().get('year') + 4, month: 12, day: 31 };
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 3);
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaTermino: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    });

    if (this.mantencion.id > 0) {
      this.mantencionService.getById(this.mantencion.id).subscribe(result => {
        if (!result.error) {
          this.mantencion = result.resultado;
          this.cargarFormulario();
          this.cargarNdbCalendar();
        } else {
          this.errorSwal(result.mensaje);
        }
      });
    }

    this.cargarRangoFechaEnFormulario();
    this.cargarListadoTipoDeMantenciones();
  }

  cargarListadoTipoDeMantenciones() {
    this.mantencionService.listadoTiposDeMantenciones().subscribe(result => {
      if (!result.error) {
        this.listaTipoMantenciones = result.resultado;
      } else {
        this.errorSwal(result.mensaje);
      }
    });
  }

  cargarNdbCalendar() {
    const momentFromDate = moment(this.mantencion.fechaInicio);
    this.fromDate.day = momentFromDate.get('date');
    this.fromDate.month = momentFromDate.get('month') + 1;
    this.fromDate.year = momentFromDate.get('year');
    const momentToDate = moment(this.mantencion.fechaTermino);
    this.toDate.day = momentToDate.get('date');
    this.toDate.month = momentToDate.get('month') + 1;
    this.toDate.year = momentToDate.get('year');
  }

  cargarRangoFechaEnFormulario() {
    if (this.fromDate != null || this.fromDate !== undefined) {
      const fechaInicio = moment(this.fromDate);
      fechaInicio.month(this.fromDate.month - 1);
      this.formulario.controls.fechaInicio.setValue(fechaInicio.format('DD-MM-YYYY'));
    } else {
      this.formulario.controls.fechaInicio.setValue('');
    }

    if (this.toDate != null || this.toDate !== undefined) {
      const fechaTermino = moment(this.toDate);
      fechaTermino.month(this.toDate.month - 1);
      this.formulario.controls.fechaTermino.setValue(fechaTermino.format('DD-MM-YYYY'));
    } else {
      this.formulario.controls.fechaTermino.setValue('');
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.cargarRangoFechaEnFormulario();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  /**
   * Carga el formulario con los datos de mantencion optenido
   */
  cargarFormulario() {
    this.formulario.controls.descripcion.setValue(this.mantencion.descripcion);
    this.formulario.controls.fechaInicio.setValue(moment(this.mantencion.fechaInicio).format('DD-MM-YYYY'));
    this.formulario.controls.fechaTermino.setValue(moment(this.mantencion.fechaTermino).format('DD-MM-YYYY'));
    this.formulario.controls.costo.setValue(this.mantencion.costo);
    this.formulario.controls.tipo.setValue(this.mantencion.tipo.id);
  }

  /**
   * Carga los atributos del mantencion con los datos ingresados
   */
  cargarMantencion() {
    this.mantencion.descripcion = this.formulario.controls.descripcion.value;
    this.mantencion.fechaInicio = this.formulario.controls.fechaInicio.value;
    this.mantencion.fechaTermino = this.formulario.controls.fechaTermino.value;
    this.mantencion.costo = this.formulario.controls.costo.value;
    this.mantencion.tipo.id = this.formulario.controls.tipo.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarMantencion();
      let esUsuarioNuevo = false;
      if (this.mantencion.id === 0) {
        esUsuarioNuevo = true;
      }
      this.formatearFechas();
      this.mantencionService.guardar(this.mantencion).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          Swal.fire({
            title: 'Exito',
            type: 'success',
            text: result.mensaje
          });
          if (esUsuarioNuevo) {
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

  formatearFechas() {
    this.mantencion.fechaInicio = moment(this.mantencion.fechaInicio, 'DD-MM-YY')
      .year(this.fromDate.year - 0)
      .toDate();
    this.mantencion.fechaTermino = moment(this.mantencion.fechaTermino, 'DD-MM-YY')
      .year(this.toDate.year - 0)
      .toDate();
  }

  enviarEmail(email: string, mensaje: string) {
    console.log('ENVIANDO CORREO....');
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
