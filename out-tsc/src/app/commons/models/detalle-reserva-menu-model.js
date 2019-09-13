import { Reserva } from './reserva-model';
var DetalleReservaMenu = /** @class */ (function () {
    function DetalleReservaMenu(fields) {
        this.id = 0;
        this.menu = null;
        this.producto = null;
        this.reserva = new Reserva();
        this.tipo = 'M';
        this.cantidad = 1;
        this.valorMenu = 0;
        this.total = 0;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return DetalleReservaMenu;
}());
export { DetalleReservaMenu };
//# sourceMappingURL=detalle-reserva-menu-model.js.map