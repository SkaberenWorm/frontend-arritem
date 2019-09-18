export class Servicio {
  public id = 0;
  public nombre = '';
  public precio = 0;
  public activo = true;

  constructor(fields?: { id?: number; nombre?: string; precio?: number; activo?: boolean }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
