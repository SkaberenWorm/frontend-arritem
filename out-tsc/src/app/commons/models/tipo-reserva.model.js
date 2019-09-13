var TipoReserva = /** @class */ (function () {
    function TipoReserva(fields) {
        this.id = 0;
        this.descripcion = '';
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return TipoReserva;
}());
export { TipoReserva };
//# sourceMappingURL=tipo-reserva.model.js.map