// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Cliente } from 'src/app/commons/models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { ClienteService } from '../cliente.service';
import { UtilValidation } from 'src/app/commons/util/util.validation';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-cliente-form-componet',
  templateUrl: 'cliente-form.component.html',
  styleUrls: ['cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnChanges {
  public cliente: Cliente = new Cliente();
  public loading = false;
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router,
    private utilValidation: UtilValidation,
    private alert: UtilAlertService
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo cliente o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.cliente.id = params['id'];
      }
    });

    if (this.cliente.id === undefined) {
      this.cliente.id = 0;
    }
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      user: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', this.utilValidation.celularValido),
      run: new FormControl('', [Validators.required, this.utilValidation.rutValido])
    });

    if (this.cliente.id > 0) {
      this.clienteService.getById(this.cliente.id).subscribe(result => {
        if (!result.error) {
          this.cliente = result.resultado;
          this.cargarFormulario();
        } else {
          console.log('Error');
        }
      });
    }
    $('#wizard-picture').change(function() {
      const input = $(this);

      if (input[0].files && input[0].files[0]) {
        const reader = new FileReader();

        reader.onload = function(e: any) {
          $('#wizardPicturePreview')
            .attr('src', e.target.result)
            .fadeIn('slow');
        };

        reader.readAsDataURL(input[0].files[0]);
        console.log('Image');
        console.log(input[0].files[0]);
      }
    });
  }

  /**
   * Carga el formulario con los datos de cliente optenido
   */
  cargarFormulario() {
    this.formulario.controls.firstName.setValue(this.cliente.nombre);
    this.formulario.controls.lastName.setValue(this.cliente.apellidos);
    this.formulario.controls.email.setValue(this.cliente.email);
    this.formulario.controls.celular.setValue(this.cliente.celular);
    this.formulario.controls.run.setValue(this.cliente.run);
    this.formulario.controls.user.setValue(this.cliente.user);
  }

  /**
   * Carga los atributos del cliente con los datos ingresados
   */
  cargarCliente() {
    this.cliente.nombre = this.formulario.controls.firstName.value;
    this.cliente.apellidos = this.formulario.controls.lastName.value;
    this.cliente.email = this.formulario.controls.email.value;
    this.cliente.celular = this.formulario.controls.celular.value;
    this.cliente.run = this.formulario.controls.run.value;
    this.cliente.user = this.formulario.controls.user.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarCliente();
      let esUsuarioNuevo = false;
      if (this.cliente.id === 0) {
        this.cliente.password = Math.random()
          .toString(36)
          .slice(2);
        esUsuarioNuevo = true;
        console.log('Su password es: ' + this.cliente.password);
      }
      this.clienteService.guardar(this.cliente).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          this.alert.successSwal(result.mensaje);
          if (esUsuarioNuevo) {
            const mensaje = 'Su password es: ' + this.cliente.password;
            this.cliente.email = 'client-arritem@atton-it.cl';
            this.enviarEmail(this.cliente.email, mensaje);
            this.limpiarFormulario();
          }
        } else {
          this.loading = false;
          this.alert.errorSwal(result.mensaje);
        }
      });
    }
  }

  enviarEmail(email: string, mensaje: string) {
    console.log('ENVIANDO CORREO....');
  }

  limpiarFormulario() {
    this.formulario.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Cliente ngOnChanges');
    console.log(changes);
    /* const input = $(this);

    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();

      reader.onload = function(e: any) {
        $('#wizardPicturePreview')
          .attr('src', e.target.result)
          .fadeIn('slow');
      };
      reader.readAsDataURL(input[0].files[0]);
    } */
  }
}
