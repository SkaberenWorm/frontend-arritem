import { TipoMantencion } from './tipo-mantencion.model';

export class Mantencion {
  public id = 0;
  public descripcion = '';
  public fechaInicio = null;
  public fechaTermino = null;
  public costo = 0;
  public tipo = new TipoMantencion();
  public activo = true;

  constructor(fields?: {
    id?: number;
    descripcion?: string;
    fechaInicio?: Date;
    fechaTermino?: Date;
    costo?: number;
    tipo?: TipoMantencion;
    activo?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
