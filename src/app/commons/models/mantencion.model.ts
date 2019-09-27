import { TipoMantencion } from './tipo-mantencion.model';
import { Departamento } from './departamento.model';

export class Mantencion {
  public id = 0;
  public descripcion = '';
  public fechaInicio = null;
  public fechaTermino = null;
  public costo = 0;
  public tipo = new TipoMantencion();
  public activo = true;
  public departamento = new Departamento();

  constructor(fields?: {
    id?: number;
    descripcion?: string;
    fechaInicio?: Date;
    fechaTermino?: Date;
    costo?: number;
    tipo?: TipoMantencion;
    activo?: boolean;
    departamento?: Departamento;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
