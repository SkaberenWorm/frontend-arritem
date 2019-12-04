import { DetalleDeptoInventario } from "./detalle_depto_inventario.model";
import { Inventario } from "./inventario.model";

export class Departamento {
  public id = 0;
  public nombre = '';
  public direccion = '';
  public estado = '';
  public tarifa = 0;
  public activo = true;
  public inventario = new Array<Inventario>();

  constructor(fields?: {
    id?: number;
    nombre?: string;
    direccion?: string;
    estado?: string;
    tarifa?: number;
    activo?: boolean;
    inventario?: Array<Inventario>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
