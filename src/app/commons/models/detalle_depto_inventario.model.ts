import { Departamento } from "./departamento.model";
import { Inventario } from "./inventario.model";

export class DetalleDeptoInventario {
  public id = 0;
  public departamento = new Departamento();
  public cantidad = 0;
  public inventario = new Inventario();

  constructor(fields?: { id?: number; departamento?: Departamento; cantidad?: number; inventario?: Inventario }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
