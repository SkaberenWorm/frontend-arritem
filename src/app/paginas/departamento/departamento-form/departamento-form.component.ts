import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService } from '../departamento.service';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/commons/models/departamento.model';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
import { DetalleDeptoInventario } from 'src/app/commons/models/detalle_depto_inventario.model';
import { Inventario } from 'src/app/commons/models/inventario.model';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styles: []
})
export class DepartamentoFormComponent implements OnInit {
  public departamento: Departamento = new Departamento();
  public loading = false;
  public formulario: FormGroup;
  public listaInventario :Array<Inventario> = new Array<Inventario>()
  // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(
    private activadedRouter: ActivatedRoute,
    private departamentoService: DepartamentoService,
    private config: NgbCarouselConfig,
    private alert: UtilAlertService
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

  agregarInventaio() {
    var producto: Inventario  = new Inventario();
    producto.descripcion = this.formulario.controls.inventario.value;
    // this.listaInventario.push(new DetalleDeptoInventario({
    //   inventario:producto,
    // }));
    this.listaInventario.push(new Inventario({descripcion: producto.descripcion}) );
    this.formulario.controls.inventario.setValue('');
    // console.log(this.listaInventario);
  }
  eliminarInventario(index: number, idDetalle?:number) {
    console.log(index);
    console.log(this.listaInventario);
    this.listaInventario.splice(index, 1);
    console.log(this.departamento.inventario);
    if (this.departamento.id > 0) {
      var detalleDeptoInventario: DetalleDeptoInventario = new DetalleDeptoInventario({ id: idDetalle, inventario: this.departamento.inventario[index], departamento: null });
      this.departamentoService.guardarInventario(detalleDeptoInventario).subscribe();
    }
  }
  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      tarifa: new FormControl('', [Validators.required, Validators.min(0)]),
      estado: new FormControl('', [Validators.required]),
      inventario: new FormControl(),
      activo: new FormControl()
    });

    if (this.departamento.id > 0) {
      this.departamentoService.getById(this.departamento.id).subscribe(result => {
        if (!result.error) {
          this.departamento = result.resultado;
          this.cargarFormulario();
          this.cargarInventario();
        }
      });
    }
  }

  cargarInventario() {
    if (this.departamento.inventario!=null) {
      this.listaInventario = this.departamento.inventario;
    } else {
      this.listaInventario = [];
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

      if (this.departamento.id == 0 || this.departamento.id == undefined) {
        esnuevo = true;
      }
      this.departamentoService.guardar(this.departamento).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          this.alert.successSwal(result.mensaje);
          if (esnuevo) {
            this.listaInventario.forEach(element => {
              var detalle = new DetalleDeptoInventario({departamento: result.resultado, inventario:element});
              this.departamentoService.guardarInventario(detalle).subscribe();
            });
            this.limpiarFormulario();
            this.listaInventario = [];
            console.log(result.resultado);
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
