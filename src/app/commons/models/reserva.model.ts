export class Reserva {
  public id = 0;
  public usuarioId = '';
  public fechaHoraInicio = new Date();
  public fechaHoraTermino = new Date();
  public total = 0;
  public observacion = '';
  public createdAt = new Date();

  constructor(fields?: {
    id: number;
    usuarioId: String;
    observacion: String;
    fechaHotaInicio: Date;
    fechaHoraTermino: Date;
    total: number;
    createdAt: Date;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
