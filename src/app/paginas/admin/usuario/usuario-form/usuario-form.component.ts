// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/commons/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { UsuarioService } from '../usuario.service';
import { UtilValidation } from 'src/app/commons/util/util.validation';

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
    private router: Router,
    private utilValidation: UtilValidation
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
    if (this.usuario.id > 0) {
      this.usuarioService.getById(this.usuario.id).subscribe(result => {
        if (!result.error) {
          this.usuario = result.resultado;
          console.log(this.usuario);
          this.cargarFormulario();
        } else {
          console.log('Error');
        }
      });
      this.formulario = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        celular: new FormControl('', this.utilValidation.celularValido),
        run: new FormControl('', [Validators.required, this.utilValidation.rutValido])
      });
    } else {
      this.formulario = new FormGroup(
        {
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email]),
          celular: new FormControl('', this.utilValidation.celularValido),
          run: new FormControl('', [Validators.required, this.utilValidation.rutValido]),
          password: new FormControl('', [Validators.required]),
          repassword: new FormControl()
        },
        {
          validators: UtilValidation.MatchPassword
        }
      );
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
    if (this.usuario.id === 0) {
      if (this.formulario.controls.password.value !== null) {
        if (this.formulario.controls.password.value.trim() !== '') {
          this.usuario.password = this.formulario.controls.password.value;
        }
      }
    }
  }

  seEstaEditando(): boolean {
    if (this.usuario.id > 0) {
      return true;
    } else {
      return false;
    }
  }

  guardar() {
    Util.setFormForValidate(this.formulario);
    if (this.formulario.valid) {
      this.loading = true;
      this.cargarUsuario();
      let esUsuarioNuevo = false;
      if (this.usuario.id === 0) {
        esUsuarioNuevo = true;
      }
      this.usuarioService.guardar(this.usuario).subscribe(result => {
        if (!result.error) {
          this.loading = false;
          this.successSwal(result.mensaje);
          if (esUsuarioNuevo) {
            const mensaje = 'Ya cuenta con acceso al sistema https://admin-arritem.atton-it.cl';
            this.usuario.email = 'admin-arritem@atton-it.cl';
            this.enviarEmail(this.usuario.email, mensaje);
            this.limpiarFormulario();
          }
        } else {
          this.loading = false;
          this.errorSwal(result.mensaje);
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
