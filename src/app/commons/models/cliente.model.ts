import { RolModel } from './rol.model';

export class Cliente {
  public id = 0;
  public run = '';
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = true;
  public celular = '';
  public rol = new RolModel();
  public password = '';

  constructor(fields?: {
    id?: number;
    run?: String;
    nombre?: String;
    apellidos?: string;
    email?: String;
    activo?: boolean;
    rol?: RolModel;
    celular?: string;
    password?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
