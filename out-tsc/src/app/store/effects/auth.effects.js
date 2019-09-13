var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as appActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { LoginService } from 'src/app/paginas/login/login.service';
var AuthEffects = /** @class */ (function () {
    function AuthEffects(actions$, loginService, authenticationService) {
        var _this = this;
        this.actions$ = actions$;
        this.loginService = loginService;
        this.authenticationService = authenticationService;
        this.authenticar$ = this.actions$.pipe(ofType(appActions.AUTENTICAR), switchMap(function (data) {
            var identificacion = data['identificacion'];
            return _this.loginService.login(identificacion.usuario, identificacion.clave, identificacion.tipo).pipe(map(function (resul) {
                if (resul['error']) {
                    return new appActions.AutenticarFail(resul);
                }
                else {
                    _this.authenticationService.guardarStorage(resul);
                    return new appActions.AutenticarSuccess(resul);
                }
            }), catchError(function (error) { return of(new appActions.AutenticarFail(error)); }));
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], AuthEffects.prototype, "authenticar$", void 0);
    AuthEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions, LoginService, AuthenticationService])
    ], AuthEffects);
    return AuthEffects;
}());
export { AuthEffects };
//# sourceMappingURL=auth.effects.js.map