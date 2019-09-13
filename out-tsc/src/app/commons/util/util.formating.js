var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var UtilFormating = /** @class */ (function () {
    function UtilFormating() {
    }
    UtilFormating.prototype.rutSinDv = function (rut) {
        var solo_rut = rut.replace('-', '');
        solo_rut = this.quitarPuntos(solo_rut);
        solo_rut = solo_rut.substring(0, solo_rut.length - 1);
        return solo_rut;
    };
    UtilFormating.prototype.quitarPuntos = function (rut) {
        return rut.replace(/\./g, '');
    };
    UtilFormating = __decorate([
        Injectable()
    ], UtilFormating);
    return UtilFormating;
}());
export { UtilFormating };
//# sourceMappingURL=util.formating.js.map