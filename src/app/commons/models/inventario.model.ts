export class Inventario {
  public id = 0;
  public descripcion = '';
  public precio = 0;
  public activo = true;

  constructor(fields?: { id?: number; descripcion?: string; precio?: number; activo?: boolean }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
