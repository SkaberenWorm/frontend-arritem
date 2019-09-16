export class RolModel {
  public id = 0;
  public descripcion = '';

  constructor(fields?: { id: number; descripcion: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
