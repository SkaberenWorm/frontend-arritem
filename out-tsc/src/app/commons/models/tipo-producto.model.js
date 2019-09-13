var TipoProducto = /** @class */ (function () {
    function TipoProducto(fields) {
        this.id = 0;
        this.descripcion = '';
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return TipoProducto;
}());
export { TipoProducto };
//# sourceMappingURL=tipo-producto.model.js.map