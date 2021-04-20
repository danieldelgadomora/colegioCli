import { CursoModel } from './../models/colegio.model';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

/**
 * Servicio que contiene las rutas para acceder a la infomación de los cursos
 */
@Injectable()
export class CursoService extends ServiceBase {

  /**
   * Constructor de CursoService
   * @param http variable para acceder a HttpClient
   */
  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl].join('/');
  }

  /**
   * Función que contiene la ruta para acceder a los cursos
   * @returns retorna los cursos
   */
  getCursos(): Observable<any>{
    const ruta = [this.ApiUrl, 'curso'].join('/');
    return this.http.get(ruta);
  }

   /**
   * Función que contiene la ruta para acceder a los cursos de un colegio
   * @returns retorna los cursos de un colegio
   */
    getCursosCol(colegio): Observable<any>{
      const ruta = [this.ApiUrl, 'curso/cursoscol',colegio].join('/');
      return this.http.get(ruta);
    }

  /**
   * Función que contiene la ruta para crear grupos
   * @param curso contiene el objeto del curso creado
   * @returns retorna el grupo creado
   */
  createCurso(curso:CursoModel): Observable<any>{
    const ruta = [this.ApiUrl, 'curso'].join('/');
    return this.http.post(ruta,curso);
  }

}
