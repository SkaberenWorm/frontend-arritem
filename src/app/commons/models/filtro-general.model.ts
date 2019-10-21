export class FiltroGeneral {
  public filtro = '';

  constructor(fields?: { filtro: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
