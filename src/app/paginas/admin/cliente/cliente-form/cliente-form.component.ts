// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { ClienteModel } from 'src/app/commons/models/cliente.model';
import { ActivatedRoute } from '@angular/router';
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

/* export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} */

@Component({
  selector: 'app-cliente-form-componet',
  templateUrl: 'cliente-form.component.html',
  styleUrls: ['cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnChanges {
  public cliente: ClienteModel = new ClienteModel();
  public loading = false;

  public formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private clienteService: ClienteService
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
      celular: new FormControl('', [Validators.required])
    });

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
  }

  /**
   * Carga los atributos del cliente con los datos ingresados
   */
  cargarCliente() {
    this.cliente.nombre = this.formulario.controls.firstName.value;
    this.cliente.apellidos = this.formulario.controls.lastName.value;
    this.cliente.email = this.formulario.controls.email.value;
    this.cliente.celular = this.formulario.controls.celular.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarCliente();
      console.log(this.cliente);
      this.clienteService.guardar(this.cliente).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          Swal.fire({
            title: 'Exito',
            type: 'success',
            text: result.mensaje
          });
        } else {
          this.loading = false;
          Swal.fire({
            title: 'Fallo',
            type: 'error',
            text: result.mensaje
          });
        }
      });
    }
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
