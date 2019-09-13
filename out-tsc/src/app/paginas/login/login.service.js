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
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var LoginService = /** @class */ (function () {
    function LoginService(http, router, authService) {
        this.http = http;
        this.router = router;
        this.authService = authService;
    }
    LoginService.prototype.login = function (username, password, tipo) {
        if (tipo === void 0) { tipo = ''; }
        var url = environment.auth_url + "oauth/token";
        var bodyH;
        if (tipo === 'd') {
            bodyH = new HttpParams()
                .set('username', 'username')
                .set('password', password)
                .set('grant_type', 'password');
        }
        else {
            bodyH = new HttpParams()
                .set('username', username)
                .set('password', password)
                .set('grant_type', 'password');
        }
        var options = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
                .set('Authorization', 'Basic YXJyaXRlbUNsaWVudDoxMjM0NTY='),
            body: bodyH
        };
        return this.http.post(url, bodyH.toString(), options);
    };
    LoginService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, Router, AuthenticationService])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map