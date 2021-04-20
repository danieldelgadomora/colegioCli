import { AsignaturaModel } from './../models/colegio.model';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

/**
 * Servicio que contiene las rutas para acceder a la infomación de asignaturas
 */
@Injectable()
export class AsignaturaService extends ServiceBase {

  /**
   * Constructor de AsignaturaService
   * @param http variable para acceder a HttpClient
   */
  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl].join('/');
  }

  /**
   * Función que contiene la ruta para acceder a las asignaturas de cada profesor
   * @param prof contiene el id del profesor selecionado
   * @returns retorna las asignaturas de los docentes
   */
  getAsignaturasDocente(prof): Observable<any>{
    const ruta = [this.ApiUrl, 'asignatura/profesor',prof].join('/');
    return this.http.get(ruta);
  }

  /**
   * Función que contiene la ruta para acceder a las asignaturas de un colegio
   * @param col contiene el id del colegio selecionado
   * @returns retorna las asignaturas de un colegio
   */
   getAsignaturasColegio(col): Observable<any>{
    const ruta = [this.ApiUrl, 'asignatura/asignatuascol',col].join('/');
    return this.http.get(ruta);
  }


  /**
   * Función que contiene la ruta para crear asignaturas
   * @param asignatura contiene el objeto de la asignatura creada
   * @returns retorna la asignatura creada
   */
   createAsignatura(asignatura:AsignaturaModel): Observable<any>{
    const ruta = [this.ApiUrl, 'asignatura'].join('/');
    return this.http.post(ruta,asignatura);
  }

}
