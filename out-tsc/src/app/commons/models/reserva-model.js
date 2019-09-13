import { EstadoReserva } from "./estado-reserva.model";
import { Sala } from "./sala.model";
import { TipoReserva } from "./tipo-reserva.model";
var Reserva = /** @class */ (function () {
    function Reserva(fields) {
        this.id = 0;
        this.usuarioId = '';
        this.cantidadPersonas = 0;
        this.fechaHoraInicio = new Date();
        this.fechaHoraTermino = new Date();
        this.total = 0;
        this.observacion = '';
        this.createdAt = new Date();
        this.menus = new Array();
        this.estado = new EstadoReserva();
        this.sala = new Sala();
        this.tipoReserva = new TipoReserva();
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Reserva;
}());
export { Reserva };
//# sourceMappingURL=reserva-model.js.map