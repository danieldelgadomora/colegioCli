import { AsignaturaModel } from './../models/colegio.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

/**
 * Servicio que contiene las rutas para acceder a la infomación de los estudiantes
 */
@Injectable()
export class EstudianteService extends ServiceBase {

  /**
   * Constructor de EstudianteService
   * @param http variable para acceder a HttpClient
   */
  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl].join('/');
  }

  /**
   * Función que contiene la ruta para acceder a los estudiantes
   * @returns retorna los estudiantes
   */
  getEstudiantes(): Observable<any>{
    const ruta = [this.ApiUrl, 'estudiante'].join('/');
    return this.http.get(ruta);
  }

  /**
   * Función que contiene la ruta para acceder a los estudiantes
   * @returns retorna los estudiantes
   */
   getEstudiantesCol(colegio): Observable<any>{
    const ruta = [this.ApiUrl, 'estudiante/estcol',colegio].join('/');
    return this.http.get(ruta);
  }


  /**
   * Función que contiene la ruta para crear estudiantes
   * @param estudiante contiene el objeto del estudiante creado
   * @returns retorna el estudiante creado
   */
  createEstudiante(estudiante): Observable<any>{
    const ruta = [this.ApiUrl, 'estudiante/addestudiante'].join('/');
    return this.http.post(ruta,estudiante);
  }

  /**
   * Función que contiene la ruta para crear estudiantes
   * @param estudiante contiene el objeto del estudiante creado
   * @param asig contiene el id de la asignatura
   * @returns retorna el estudiante creado
   */
   createMatricula(estudiante,asig): Observable<any>{
    const ruta = [this.ApiUrl, 'estudiante/addmatricula',asig].join('/');
    return this.http.post(ruta,estudiante);
  }

  /**
   * Función que contiene la ruta para crear matriculas de estudiantes antiguos
   * @param est contiene el objeto del estudiante
   *  @param asig contiene el objeto del estudiante
   * @returns retorna el estudiante creado
   */
   createMatriculaAnt(asig,est): Observable<any>{
    const ruta = [this.ApiUrl, 'estudiante/addmatriculaant',asig,est].join('/');
    return this.http.post(ruta,asig);
  }

}
