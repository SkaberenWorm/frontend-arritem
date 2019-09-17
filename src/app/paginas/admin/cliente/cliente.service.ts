import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/commons/models/cliente.model';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase = `${environment.backend_url}api/usuario`;
  constructor(private http: HttpClient) {}

  /**
   * Trae los usuarios con rol de cliente
   */
  public listado(): Observable<ResultadoProc<Array<Cliente>>> {
    return this.http.get<ResultadoProc<Array<Cliente>>>(`${this.urlBase}/all/cliente`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<Cliente>> {
    return this.http.get<ResultadoProc<Cliente>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(cliente: Cliente): Observable<ResultadoProc<Cliente>> {
    if (cliente.id > 0) {
      // Editar
      return this.http.put<ResultadoProc<Cliente>>(this.urlBase, cliente);
    } else {
      // Agregar
      cliente.activo = true;
      // Rol 3 = cliente
      cliente.rol.id = 3;
      return this.http.post<ResultadoProc<Cliente>>(this.urlBase, cliente);
    }
  }
}
