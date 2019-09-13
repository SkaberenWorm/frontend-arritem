import { TipoProducto } from './tipo-producto.model';
var Producto = /** @class */ (function () {
    function Producto(fields) {
        this.id = 0;
        this.descripcion = '';
        this.precio = 0;
        this.activo = true;
        this.tipo = new TipoProducto();
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Producto;
}());
export { Producto };
//# sourceMappingURL=producto.model.js.map