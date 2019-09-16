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
}
