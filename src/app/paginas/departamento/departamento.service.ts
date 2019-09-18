import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Departamento } from 'src/app/commons/models/departamento.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private urlBase = `${environment.backend_url}api/departamento`;
  constructor(private http: HttpClient) {}

  public listado(): Observable<ResultadoProc<Array<Departamento>>> {
    return this.http.get<ResultadoProc<Array<Departamento>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<Departamento>> {
    return this.http.get<ResultadoProc<Departamento>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(cliente: Departamento): Observable<ResultadoProc<Departamento>> {
    if (cliente.id > 0) {
      return this.http.put<ResultadoProc<Departamento>>(this.urlBase, cliente);
    } else {
      return this.http.post<ResultadoProc<Departamento>>(this.urlBase, cliente);
    }
  }
}
