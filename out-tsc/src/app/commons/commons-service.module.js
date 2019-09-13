var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginGuard } from './guards/login.guard';
import { RolAdminGuard } from './guards/rol-admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { Util } from './util/util';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolClienteDenyGuard } from './guards/rol-cliente-deny.guard';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolFuncionarioGuard } from './guards/rol-funcionario.guard';
var CommonsServiceModule = /** @class */ (function () {
    function CommonsServiceModule() {
    }
    CommonsServiceModule = __decorate([
        NgModule({
            declarations: [FieldErrorDisplayComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                BlockUIModule,
                BlockUIHttpModule,
                NgbPaginationModule,
                NgbModalModule,
                NgxPaginationModule,
                NgxPaginationModule,
                MatSelectModule,
                MatInputModule,
                NgbModule
            ],
            providers: [
                AuthenticationService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true
                },
                LoginGuard,
                RolAdminGuard,
                RolFuncionarioGuard,
                RolClienteDenyGuard,
                AuthGuard,
                Util,
                UtilFormating,
                UtilValidation
            ],
            exports: [FieldErrorDisplayComponent]
        })
    ], CommonsServiceModule);
    return CommonsServiceModule;
}());
export { CommonsServiceModule };
//# sourceMappingURL=commons-service.module.js.map