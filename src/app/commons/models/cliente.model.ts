import { RolModel } from './rol.model';

export class ClienteModel {
  public id = 0;
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = true;
  public celular = '';
  public rol = new RolModel();

  constructor(fields?: {
    id?: number;
    nombre?: String;
    apellidos?: string;
    email?: String;
    activo?: boolean;
    rol?: RolModel;
    celular?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
