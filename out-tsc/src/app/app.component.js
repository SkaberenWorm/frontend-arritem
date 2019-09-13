var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { Store } from '@ngrx/store';
import { SetAutenticado } from 'src/app/store/actions';
import { AuthenticationService } from './commons/services/authentication.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(router, store, _auth) {
        this.router = router;
        this.store = store;
        this._auth = _auth;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log("ngOnInit APP");
        this._auth.isLogin().then(function (loEsta) {
            if (loEsta) {
                //console.log('is login');
                _this.store.dispatch(new SetAutenticado(_this._auth.obtenerUserName()));
            }
        });
        //
        //this.blockUI.start();
        this.router.events.subscribe(this.navigationInterceptor.bind(this));
    };
    AppComponent.prototype.navigationInterceptor = function (e) {
        if (e instanceof NavigationStart) {
        }
        if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
            var splashScreen_1 = document.querySelector('.app-splash-screen');
            if (splashScreen_1) {
                splashScreen_1['style'].opacity = 0;
                setTimeout(function () { return splashScreen_1 && splashScreen_1.parentNode.removeChild(splashScreen_1); }, 300);
            }
        }
    };
    __decorate([
        BlockUI(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "blockUI", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app-my-app',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [Router, Store, AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map