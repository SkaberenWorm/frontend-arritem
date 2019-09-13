import { Piso } from './piso.model';
import { TipoUbicacion } from './tipo-ubicacion.model';
var Sala = /** @class */ (function () {
    function Sala(fields) {
        /* constructor(public id: number, public descripcion: string, public piso: Piso, public activo: boolean) {
      
        } */
        this.id = 0;
        this.descripcion = '';
        this.piso = new Piso();
        this.activo = true;
        this.tipoUbicacion = new TipoUbicacion();
        this.maximoMesas = 0;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Sala;
}());
export { Sala };
//# sourceMappingURL=sala.model.js.map