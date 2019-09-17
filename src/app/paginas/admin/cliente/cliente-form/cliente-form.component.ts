// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Cliente } from 'src/app/commons/models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { ClienteService } from '../cliente.service';

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
  @Output() titulo = 'dasds';
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo cliente o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.cliente.id = params['id'];
      }
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      run: new FormControl('', [Validators.required])
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
      }
      this.clienteService.guardar(this.cliente).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          Swal.fire({
            title: 'Exito',
            type: 'success',
            text: result.mensaje
          });
          if (esUsuarioNuevo) {
            const mensaje = 'Su password es: ' + this.cliente.password;
            this.enviarEmail(this.cliente.email, mensaje);
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
