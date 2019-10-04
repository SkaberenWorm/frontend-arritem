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
import { RolService } from '../rol.service';
import { Rol } from 'src/app/commons/models/rol.model';
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
  selector: 'app-usuario-form-componet',
  templateUrl: 'usuario-form.component.html',
  styleUrls: ['usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit, OnChanges {
  public usuario: Usuario = new Usuario();
  public loading = false;
  public formulario: FormGroup;
  public listadoRoles: Array<Rol> = [];

  constructor(
    private formBuilder: FormBuilder,
    private activadedRouter: ActivatedRoute,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private utilValidation: UtilValidation,
    private alert: UtilAlertService
  ) {
    /**
     * Escuchamos si viene por URL el parametro ID para la saber si es un nuevo usuario o una edición de este
     */
    this.activadedRouter.params.subscribe(params => {
      if (params['id'] !== null || params['id'] !== undefined) {
        this.usuario.id = params['id'];
      }
    });

    if (this.usuario.id === undefined) {
      this.usuario.id = 0;
    }
  }

  ngOnInit() {
    if (this.usuario.id > 0) {
      this.usuarioService.getById(this.usuario.id).subscribe(result => {
        if (!result.error) {
          this.usuario = result.resultado;
          this.cargarFormulario();
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      });
      this.formulario = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        user: new FormControl(),
        email: new FormControl('', [Validators.required, Validators.email]),
        celular: new FormControl('', this.utilValidation.celularValido),
        rol: new FormControl('', [Validators.required]),
        run: new FormControl('', [Validators.required, this.utilValidation.rutValido])
      });
    } else {
      this.formulario = new FormGroup(
        {
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          user: new FormControl(),
          email: new FormControl('', [Validators.required, Validators.email]),
          celular: new FormControl('', this.utilValidation.celularValido),
          rol: new FormControl('', [Validators.required]),
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

    this.cargarListadoRoles();
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
    this.formulario.controls.user.setValue(this.usuario.user);
    this.formulario.controls.rol.setValue(this.usuario.rol.id);
  }

  cargarListadoRoles() {
    this.rolService.listado().subscribe(result => {
      if (!result.error) {
        this.listadoRoles = result.resultado;
      } else {
        this.alert.errorSwal(result.mensaje);
      }
    });
  }

  /**
   * Carga los atributos del usuario con los datos ingresados
   */
  cargarUsuario() {
    this.usuario.nombre = this.formulario.controls.firstName.value;
    this.usuario.apellidos = this.formulario.controls.lastName.value;
    this.usuario.email = this.formulario.controls.email.value;
    this.usuario.user = this.formulario.controls.user.value;
    this.usuario.celular = this.formulario.controls.celular.value;
    this.usuario.run = this.formulario.controls.run.value;
    this.usuario.rol.id = this.formulario.controls.rol.value;
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
          this.alert.successSwal(result.mensaje);
          if (esUsuarioNuevo) {
            const mensaje = 'Ya cuenta con acceso al sistema https://admin-arritem.atton-it.cl';
            this.usuario.email = 'admin-arritem@atton-it.cl';
            this.enviarEmail(this.usuario.email, mensaje);
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
