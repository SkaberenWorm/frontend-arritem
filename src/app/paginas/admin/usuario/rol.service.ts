import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Rol } from 'src/app/commons/models/rol.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlBase = `${environment.backend_url}api/rol`;
  constructor(private http: HttpClient) {}

  /**
   * Trae los roles que no sean cliente
   */
  public listado(): Observable<ResultadoProc<Array<Rol>>> {
    return this.http.get<ResultadoProc<Array<Rol>>>(`${this.urlBase}/all/no_client`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<Rol>> {
    return this.http.get<ResultadoProc<Rol>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }
}
