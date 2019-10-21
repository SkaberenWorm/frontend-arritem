import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Reserva } from 'src/app/commons/models/reserva.model';
import { map } from 'rxjs/operators';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';
import { FiltroGeneral } from 'src/app/commons/models/filtro-general.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private urlBase = `${environment.backend_url}api/reserva`;
  constructor(private http: HttpClient) {}

  public listado(): Observable<ResultadoProc<Array<Reserva>>> {
    return this.http.get<ResultadoProc<Array<Reserva>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public listSearchPagination(
    searchPagination: SearchPagination<FiltroGeneral>
  ): Observable<ResultadoProc<IPaginacion<Reserva>>> {
    return this.http
      .post<ResultadoProc<IPaginacion<Reserva>>>(`${this.urlBase}/pagitation`, searchPagination)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  public getById(id: number): Observable<ResultadoProc<Reserva>> {
    return this.http.get<ResultadoProc<Reserva>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(reserva: Reserva): Observable<ResultadoProc<Reserva>> {
    if (reserva.id > 0) {
      return this.http.put<ResultadoProc<Reserva>>(this.urlBase, reserva);
    } else {
      return this.http.post<ResultadoProc<Reserva>>(this.urlBase, reserva);
    }
  }
}
