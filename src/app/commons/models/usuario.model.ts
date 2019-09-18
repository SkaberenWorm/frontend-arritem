import { Rol } from './rol.model';

export class Usuario {
  public id = 0;
  public run = '';
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = true;
  public rol = new Rol();
  public password = '';
  public celular = '';
  constructor(fields?: {
    id?: number;
    run?: String;
    nombre?: String;
    apellidos?: string;
    email?: String;
    activo?: boolean;
    rol?: Rol;
    password?: string;
    celular?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
