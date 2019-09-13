var TipoUbicacion = /** @class */ (function () {
    function TipoUbicacion(fields) {
        this.id = 0;
        this.descripcion = '';
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return TipoUbicacion;
}());
export { TipoUbicacion };
//# sourceMappingURL=tipo-ubicacion.model.js.map