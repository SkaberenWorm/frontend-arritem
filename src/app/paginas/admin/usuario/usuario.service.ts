import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Usuario } from 'src/app/commons/models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlBase = `${environment.backend_url}api/usuario`;
  constructor(private http: HttpClient) {}

  /**
   * Trae los usuarios con rol administrador y funcionario
   */
  public listado(): Observable<ResultadoProc<Array<Usuario>>> {
    return this.http.get<ResultadoProc<Array<Usuario>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public getById(id: number): Observable<ResultadoProc<Usuario>> {
    return this.http.get<ResultadoProc<Usuario>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(usuario: Usuario): Observable<ResultadoProc<Usuario>> {
    if (usuario.id > 0) {
      // Editar
      return this.http.put<ResultadoProc<Usuario>>(this.urlBase, usuario);
    } else {
      // Agregar
      usuario.activo = true;
      // Rol 3 = usuario
      usuario.rol.id = 3;
      return this.http.post<ResultadoProc<Usuario>>(this.urlBase, usuario);
    }
  }
}
