var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilValidation } from 'src/app/commons/util/util.validation';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Autenticar } from 'src/app/store/actions';
import { BlockUI } from 'ng-block-ui';
var LoginIndexComponent = /** @class */ (function () {
    function LoginIndexComponent(element, loginService, utilValidation, router, authenticationService, store) {
        this.element = element;
        this.loginService = loginService;
        this.utilValidation = utilValidation;
        this.router = router;
        this.authenticationService = authenticationService;
        this.store = store;
        this.test = new Date();
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    LoginIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionStore = this.store.select('auth').subscribe(function (state) {
            if (state.loading) {
                _this.blockUI.start();
            }
            else {
                _this.blockUI.stop();
            }
            if (state.authenticate) {
                if (_this.authenticationService.esRol('Administrador')) {
                    _this.router.navigate(['/admin']);
                }
                else if (_this.authenticationService.esRol('Funcionario')) {
                    _this.router.navigate(['/funcionario']);
                }
                else {
                    _this.router.navigate(['/cliente']);
                }
            }
            if (state.error != null) {
                if (state.error.status === 400) {
                    swal.fire({
                        title: 'Error',
                        text: state.error.error.error_description,
                        type: 'error',
                        allowOutsideClick: false
                    });
                }
                else {
                    swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al intentar Identificarte',
                        type: 'error',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            }
        });
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        var card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
        this.formLogin = new FormGroup({
            usuario: new FormControl('', [Validators.required]),
            clave: new FormControl('', Validators.required)
        });
    };
    LoginIndexComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptionStore != null) {
            this.subscriptionStore.unsubscribe();
        }
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    };
    LoginIndexComponent.prototype.login = function () {
        this.utilValidation.setFormForValidate(this.formLogin);
        if (this.formLogin.valid) {
            var usuario = this.formLogin.controls.usuario.value;
            var clave = this.formLogin.controls.clave.value;
            var tipo = '';
            var identificacion = {
                usuario: usuario,
                clave: clave,
                tipo: tipo
            };
            this.store.dispatch(new Autenticar(identificacion));
        }
    };
    __decorate([
        BlockUI(),
        __metadata("design:type", Object)
    ], LoginIndexComponent.prototype, "blockUI", void 0);
    LoginIndexComponent = __decorate([
        Component({
            selector: 'app-login-index',
            templateUrl: './login-index.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ElementRef,
            LoginService,
            UtilValidation,
            Router,
            AuthenticationService,
            Store])
    ], LoginIndexComponent);
    return LoginIndexComponent;
}());
export { LoginIndexComponent };
//# sourceMappingURL=login-index.component.js.map