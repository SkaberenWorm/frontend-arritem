// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/commons/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { UsuarioService } from '../usuario.service';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-usuario-form-componet',
  templateUrl: 'usuario-form.component.html',
  styleUrls: ['usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit, OnChanges {
  public usuario: Usuario = new Usuario();
  public loading = false;

  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo usuario o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.usuario.id = params['id'];
      }
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl(),
      run: new FormControl('', [Validators.required])
    });

    if (this.usuario.id > 0) {
      this.usuarioService.getById(this.usuario.id).subscribe(result => {
        if (!result.error) {
          this.usuario = result.resultado;
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
   * Carga el formulario con los datos de usuario optenido
   */
  cargarFormulario() {
    this.formulario.controls.firstName.setValue(this.usuario.nombre);
    this.formulario.controls.lastName.setValue(this.usuario.apellidos);
    this.formulario.controls.email.setValue(this.usuario.email);
    this.formulario.controls.celular.setValue(this.usuario.celular);
    this.formulario.controls.run.setValue(this.usuario.run);
  }

  /**
   * Carga los atributos del usuario con los datos ingresados
   */
  cargarUsuario() {
    this.usuario.nombre = this.formulario.controls.firstName.value;
    this.usuario.apellidos = this.formulario.controls.lastName.value;
    this.usuario.email = this.formulario.controls.email.value;
    this.usuario.celular = this.formulario.controls.celular.value;
    this.usuario.run = this.formulario.controls.run.value;
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarUsuario();
      let esUsuarioNuevo = false;
      if (this.usuario.id === 0) {
        this.usuario.password = Math.random()
          .toString(36)
          .slice(2);
        esUsuarioNuevo = true;
      }
      this.usuarioService.guardar(this.usuario).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          Swal.fire({
            title: 'Exito',
            type: 'success',
            text: result.mensaje
          });
          if (esUsuarioNuevo) {
            const mensaje = 'Su password es: ' + this.usuario.password;
            this.enviarEmail(this.usuario.email, mensaje);
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
    console.log('Usuario ngOnChanges');
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
