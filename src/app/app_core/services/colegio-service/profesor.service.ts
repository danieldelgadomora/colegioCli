import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

/**
 * Servicio que contiene las rutas para acceder a la infomación de profesores
 */
@Injectable()
export class ProfesorService extends ServiceBase {

  /**
   * Constructor de ProfesorService
   * @param http variable para acceder a HttpClient
   */
  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl].join('/');
  }

  /**
   * Función que contiene la ruta para acceder a la información de los profesores
   * @returns retorna los profesores
   */
  getProfesores(): Observable<any>{
    const ruta = [this.ApiUrl, 'profesor'].join('/');
    return this.http.get(ruta);
  }
  /**
   * Función que contiene la ruta para acceder a la información de los profesores de un colegio
   * @returns retorna los profesores de un colegio
   */
   getProfesoresCol(colegio): Observable<any>{
    const ruta = [this.ApiUrl, 'profesor/profesorescol',colegio].join('/');
    return this.http.get(ruta);
  }

  /**
   * Función que contiene la ruta para crear profesores
   * @param profesor contiene el objeto del profesor creado
   * @returns retorna el profesor creado
   */
   createProfesor(profesor): Observable<any>{
    const ruta = [this.ApiUrl, 'profesor'].join('/');
    return this.http.post(ruta,profesor);
  }


}
