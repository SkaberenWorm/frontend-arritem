import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from 'src/app/commons/models/cliente.model';
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
  public listado(): Observable<ResultadoProc<Array<ClienteModel>>> {
    console.log('Agregar filtro - solo clientes');
    return this.http.get<ResultadoProc<Array<ClienteModel>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<ClienteModel>> {
    return this.http.get<ResultadoProc<ClienteModel>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(cliente: ClienteModel): Observable<ResultadoProc<ClienteModel>> {
    // Rol 3 = cliente
    cliente.rol.id = 3;
    cliente.activo = true;

    if (cliente.id > 0) {
      // Editar
      return this.http.put<ResultadoProc<ClienteModel>>(this.urlBase, cliente);
    } else {
      // Agregar
      return this.http.post<ResultadoProc<ClienteModel>>(this.urlBase, cliente);
    }
  }
}
