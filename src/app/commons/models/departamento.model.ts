export class Departamento {
  public id = 0;
  public nombre = '';
  public direccion = '';
  public estado = '';
  public tarifa = 0;
  public activo = true;

  constructor(fields?: {
    id?: number;
    nombre?: string;
    direccion?: string;
    estado?: string;
    tarifa?: number;
    activo?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
