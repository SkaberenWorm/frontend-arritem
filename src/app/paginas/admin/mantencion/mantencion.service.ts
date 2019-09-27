import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Mantencion } from 'src/app/commons/models/mantencion.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TipoMantencion } from 'src/app/commons/models/tipo-mantencion.model';

@Injectable({
  providedIn: 'root'
})
export class MantencionService {
  private urlBase = `${environment.backend_url}api/mantencion`;
  constructor(private http: HttpClient) {}

  /**
   * Trae las mantenciones
   */
  public listado(): Observable<ResultadoProc<Array<Mantencion>>> {
    return this.http.get<ResultadoProc<Array<Mantencion>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  /**
   * Trae los tipos de mantenciones
   */
  public listadoTiposDeMantenciones(): Observable<ResultadoProc<Array<TipoMantencion>>> {
    return this.http
      .get<ResultadoProc<Array<TipoMantencion>>>(`${this.urlBase}/tipo/all/active`)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  public getById(id: number): Observable<ResultadoProc<Mantencion>> {
    return this.http.get<ResultadoProc<Mantencion>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(mantencion: Mantencion): Observable<ResultadoProc<Mantencion>> {
    if (mantencion.id > 0) {
      return this.http.put<ResultadoProc<Mantencion>>(this.urlBase, mantencion);
    } else {
      return this.http.post<ResultadoProc<Mantencion>>(this.urlBase, mantencion);
    }
  }
}
