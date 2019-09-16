export class ClienteModel {
  public id = 0;
  public nombre = '';
  public email = '';
  public activo = true;
  public celular = '';
  public rol = '';

  constructor(fields?: {
    id?: number;
    nombre?: String;
    email?: String;
    activo?: boolean;
    rol?: string;
    celular?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
