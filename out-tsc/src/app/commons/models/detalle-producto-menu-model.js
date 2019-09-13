import { Producto } from './producto.model';
var DetalleProductoMenu = /** @class */ (function () {
    function DetalleProductoMenu(fields) {
        this.id = 0;
        this.producto = new Producto();
        this.idMenu = 0;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return DetalleProductoMenu;
}());
export { DetalleProductoMenu };
//# sourceMappingURL=detalle-producto-menu-model.js.map