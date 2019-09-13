var Util = /** @class */ (function () {
    function Util() {
    }
    Util.obtenerMensajes = function (mensajes) {
        var msg = '';
        if (!Array.isArray(mensajes)) {
            return mensajes;
        }
        if (mensajes == null) {
            msg = 'Error desconocido';
            return msg;
        }
        for (var i = 0; i < mensajes.length; i++) {
            msg += mensajes[i] + '\n';
        }
        if (msg === '') {
            msg = 'Error desconocido';
            return msg;
        }
        return msg;
    };
    Util.formatBytes = function (a, b) {
        if (0 === a) {
            return '0 Bytes';
        }
        var c = 1024;
        var d = b || 2;
        var e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
    };
    Util.getDvFromRutString = function (rut) {
        var rutStr = rut.replace(/\./g, '').replace(/\./g, '');
        return rutStr.substr(rutStr.length - 1, rutStr.length);
    };
    Util.getRutFromRutString = function (rut) {
        var rutStr = rut.replace(/\./g, '');
        rutStr = rutStr.replace(/\-/g, '');
        return Number(rutStr.substr(0, rutStr.length - 1));
    };
    Util.setFormForValidate = function (form) {
        Object.keys(form.controls).forEach(function (field) {
            var control = form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    };
    return Util;
}());
export { Util };
//# sourceMappingURL=util.js.map