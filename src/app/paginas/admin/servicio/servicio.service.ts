import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Servicio } from 'src/app/commons/models/servicio.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlBase = `${environment.backend_url}api/servicio`;
  constructor(private http: HttpClient) {}

  public listado(): Observable<ResultadoProc<Array<Servicio>>> {
    return this.http.get<ResultadoProc<Array<Servicio>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        console.log(result.resultado);
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<Servicio>> {
    return this.http.get<ResultadoProc<Servicio>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(cliente: Servicio): Observable<ResultadoProc<Servicio>> {
    if (cliente.id > 0) {
      return this.http.put<ResultadoProc<Servicio>>(this.urlBase, cliente);
    } else {
      return this.http.post<ResultadoProc<Servicio>>(this.urlBase, cliente);
    }
  }
}
