import { RolModel } from './rol.model';

export class Usuario {
  public id = 0;
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = true;
  public rol = new RolModel();

  constructor(fields?: {
    id?: number;
    nombre?: String;
    apellidos?: string;
    email?: String;
    activo?: boolean;
    rol?: RolModel;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
