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
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(_http, router // private _personaService: PersonaService
    ) {
        this._http = _http;
        this.router = router;
        this.token = '';
        this.nombre = '';
        this.fin = 0;
        //public persona: PersonaModel = new PersonaModel();
        this.usuario = new Usuario();
        this.imgUsuario = moment().format('X') + '.jpg';
        this.cargarStorage();
    }
    AuthenticationService.prototype.cargarStorage = function () {
        this.token = '';
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '' && localStorage.getItem('token') !== undefined) {
            this.token = localStorage.getItem('token');
        }
        if (localStorage.getItem('nombre') !== null && localStorage.getItem('nombre') !== '' && localStorage.getItem('nombre') !== undefined) {
            this.nombre = localStorage.getItem('nombre');
        }
    };
    AuthenticationService.prototype.generaHeader = function () {
        return new HttpHeaders().set('Authorization', this.token);
    };
    AuthenticationService.prototype.estaAutorizado = function () {
        if (this.token === null) {
            this.logout();
        }
        else if (this.token.trim().length === 0) {
            this.logout();
        }
        if (moment().isSameOrBefore(moment(this.fin)) && this.token.length > 120) {
            return true;
        }
        else {
            this.logout();
        }
    };
    AuthenticationService.prototype.estaLogueado = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.cargarStorage();
            if (_this.token === null) {
                _this.logout();
                resolve(false);
            }
            if (_this.token.trim().length === 0) {
                _this.logout();
                resolve(false);
            }
            if (moment().isSameOrBefore(moment(_this.fin)) && _this.token.trim().length > 120) {
                resolve(true);
            }
            else {
                _this.logout();
                resolve(false);
            }
        });
        return promise;
    };
    AuthenticationService.prototype.guardarStorage = function (respuesta) {
        localStorage.setItem('token', respuesta.access_token);
        this.token = respuesta.access_token;
    };
    AuthenticationService.prototype.logout = function () {
        this.token = '';
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    AuthenticationService.prototype.isAuthorized = function () {
        if (this.token === null) {
            this.logout();
        }
        else if (this.token.trim().length === 0) {
            this.logout();
        }
        if (this.token.length > 120 && moment().isSameOrBefore(moment.unix(this.obtenerExpiracionToken(this.token)))) {
            return true;
        }
        else {
            this.logout();
        }
    };
    AuthenticationService.prototype.isLogin = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.cargarStorage();
            if (_this.token === null) {
                resolve(false);
                _this.logout();
                return;
            }
            if (_this.token.trim().length === 0) {
                resolve(false);
                _this.logout();
                return;
            }
            if (_this.token.length > 120 && moment().isSameOrBefore(moment.unix(_this.obtenerExpiracionToken(_this.token)))) {
                resolve(true);
            }
            else {
                resolve(false);
                _this.logout();
            }
        });
        return promise;
    };
    AuthenticationService.prototype.esRol = function (id_role) {
        this.cargarStorage();
        var payload = this.obtenerDatosToken(this.token);
        if (payload !== null && payload.authorities !== undefined) {
            // tslint:disable-next-line: prefer-for-of
            for (var index = 0; index < payload.authorities.length; index++) {
                if (payload.authorities[index] === id_role) {
                    return true;
                }
            }
        }
        return false;
    };
    AuthenticationService.prototype.obtenerDatosToken = function (accessToken) {
        if (accessToken != null && accessToken !== '') {
            return JSON.parse(atob(accessToken.split('.')[1]));
        }
        return null;
    };
    AuthenticationService.prototype.obtenerExpiracionToken = function (token) {
        return this.obtenerDatosToken(token).exp;
    };
    AuthenticationService.prototype._obtenerUserName = function (token) {
        return this.obtenerDatosToken(token).user_name;
    };
    AuthenticationService.prototype.obtenerUserName = function () {
        return this._obtenerUserName(this.token);
    };
    AuthenticationService.prototype.obtenerName = function () {
        return this.obtenerDatosToken(this.token).nombre;
    };
    AuthenticationService.prototype.obtenerRole = function () {
        return this.obtenerDatosToken(this.token).authorities;
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            Router // private _personaService: PersonaService
        ])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map