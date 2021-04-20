import { CursoModel } from './../models/colegio.model';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

/**
 * Servicio que contiene las rutas para acceder a la infomación de los colegios
 */
@Injectable()
export class ColegioService extends ServiceBase {

  /**
   * Constructor de ColegioService
   * @param http variable para acceder a HttpClient
   */
  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl].join('/');
  }

  /**
   * Función que contiene la ruta para acceder a los colegios
   * @returns retorna los cursos
   */
  getColegio(id): Observable<any>{
    const ruta = [this.ApiUrl, 'colegio',id].join('/');
    return this.http.get(ruta);
  }

}
