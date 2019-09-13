var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { UtilFormating } from './util.formating';
import * as moment from 'moment';
var UtilValidation = /** @class */ (function () {
    function UtilValidation(utilFormating) {
        var _this = this;
        this.utilFormating = utilFormating;
        this.fechaValida = function (control) {
            moment().locale('es');
            if (control.value !== '') {
                if (!moment(control.value, 'DD/MM/YYYY', true).isValid()) {
                    return {
                        fechaValida: true
                    };
                }
            }
            return null;
        };
        this.fechaHoraValida = function (control) {
            moment().locale('es');
            if (control.value !== '') {
                if (!moment(control.value, 'DD/MM/YYYY HH:mm').isValid()) {
                    return {
                        fechaValida: true
                    };
                }
            }
            return null;
        };
        this.horaValida = function (control) {
            moment().locale('es');
            if (!moment(control.value, 'HH:mm', true).isValid()) {
                return {
                    horaValida: true
                };
            }
            return null;
        };
        this.porcentajeValido = function (control) {
            var valor = control.value;
            if (valor !== null) {
                if (!/^\d+$/.test(valor)) {
                    return {
                        porcentajeValido: true
                    };
                }
                if (Number(valor) > 0 && Number(valor) > 100) {
                    return {
                        porcentajeValido: true
                    };
                }
            }
        };
        this.emailValido = function (control) {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
                return {
                    emailValido: true
                };
            }
        };
        this.celularValido = function (control) {
            if (!/^\+?56(\s?)(0?9)(\s?)[98765]\d{7}$/.test(control.value)) {
                return {
                    celularValido: true
                };
            }
        };
        this.rutValido = function (control) {
            var rut = control.value;
            // console.log(rut);
            if (rut === null || rut === undefined || rut === '') {
                return null;
            }
            // Despejar Puntos
            var valor = _this.utilFormating.quitarPuntos(rut);
            // console.log("valor", valor);
            // Despejar Guión
            valor = valor.replace('-', '');
            // console.log("valor", valor);
            // Aislar Cuerpo y Dígito Verificador
            var cuerpo = valor.slice(0, -1);
            // console.log("cuerpo", cuerpo);
            var dv = valor.slice(-1).toUpperCase();
            // Formatear RUN
            rut = cuerpo + '-' + dv;
            // console.log("rut", rut);
            // Si no cumple con el mínimo ej. (n.nnn.nnn)
            if (cuerpo.length < 7) {
                return { rutValido: true };
            }
            // Calcular Dígito Verificador
            var suma = 0;
            var multiplo = 2;
            // Para cada dígito del Cuerpo
            for (var i = 1; i <= cuerpo.length; i++) {
                // Obtener su Producto con el Múltiplo Correspondiente
                var index = multiplo * Number(valor.charAt(cuerpo.length - i));
                // Sumar al Contador General
                suma = suma + index;
                // Consolidar Múltiplo dentro del rango [2,7]
                if (multiplo < 7) {
                    multiplo = multiplo + 1;
                }
                else {
                    multiplo = 2;
                }
            }
            // Calcular Dígito Verificador en base al Módulo 11
            var dvEsperado = String(11 - (suma % 11));
            // Casos Especiales (0 y K)
            dv = dv === 'K' ? '10' : dv;
            dv = dv === '0' ? '11' : dv;
            // console.log(dvEsperado, dv);
            if (dvEsperado !== dv) {
                return { rutValido: true };
            }
        };
        this.validateDate = function (control) {
            if (control.value !== '') {
                if (!moment(control.value, 'DD/MM/YYYY', true).isValid()) {
                    return {
                        invalidDate: true
                    };
                }
            }
            return null;
        };
        this.invalidEmail = function (control) {
            if (control.value === '') {
                return;
            }
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
                return {
                    invalidEmail: true
                };
            }
        };
    }
    UtilValidation.MatchPassword = function (AC) {
        var password = AC.root.get('password').value; // to get value in input tag
        var confirmPassword = AC.root.get('repassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.root.get('repassword').setErrors({ matchPassword: true });
        }
        else {
            return null;
        }
    };
    UtilValidation.prototype.setFormForValidate = function (form) {
        Object.keys(form.controls).forEach(function (field) {
            var control = form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    };
    UtilValidation = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UtilFormating])
    ], UtilValidation);
    return UtilValidation;
}());
export { UtilValidation };
//# sourceMappingURL=util.validation.js.map