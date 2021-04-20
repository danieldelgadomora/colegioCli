import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
import { ServiceBase } from '../service-base';
import Swal from 'sweetalert2'

/**
 * Servicio que contiene las funciones utilizadas en diferentes módulos
 */
@Injectable()
export class FuncionesService extends ServiceBase {

  /**
   * Función qie permite calcular la edad de cada personaje
   * @param dateOfBirth variable que contiene la fecha de nacimiento
   * @returns retorna la edad del personaje
   */
  calcularEdad(dateOfBirth){
    let birDay = dateOfBirth.split("-");
    let newBirDay = new Date(birDay[1] + '/' + birDay[0] + '/' + birDay[2]).getTime();
    let newBirDay2 = Date.now() - newBirDay;
    return Math.abs(new Date (newBirDay2).getUTCFullYear() - 1970);
  }

  /**
   * Función que contiene el menjae de éxito
   */
  mensajeExito(mensaje){
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })

  }
}
