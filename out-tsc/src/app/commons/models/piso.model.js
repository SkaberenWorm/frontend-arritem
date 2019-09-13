import { Departamento } from './departamento.model';
var Piso = /** @class */ (function () {
    function Piso(fields) {
        this.id = 0;
        this.descripcion = '';
        this.departamento = new Departamento();
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Piso;
}());
export { Piso };
//# sourceMappingURL=piso.model.js.map