var EstadoReserva = /** @class */ (function () {
    function EstadoReserva(fields) {
        this.id = 0;
        this.descripcion = '';
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return EstadoReserva;
}());
export { EstadoReserva };
//# sourceMappingURL=estado-reserva.model.js.map