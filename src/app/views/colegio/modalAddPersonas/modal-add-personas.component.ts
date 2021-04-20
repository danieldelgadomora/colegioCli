import { EstudianteService } from './../../../app_core/services/colegio-service/estudiante.service';
import { FuncionesService } from './../../../app_core/services/colegio-service/funciones.service';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Componente para que contiene el formulario ya sea para registrar un profesor o un estuudiante.
 */
@Component({
  selector: 'app-modal-add-personas',
  templateUrl: './modal-add-personas.component.html',
  styleUrls: ['./modal-add-personas.component.scss']
})
export class ModalAddPersonas{


  /**
   * Varible que contiene los valores del formulario
   */
  formAdd: FormGroup

  /**
   * Variable que contiene la la infomación del modal
   */
  @Input() modalRef: any;

  /**
   * Variable boolenana para mostrar el mensaje de requerido
   */
  msgReq: Boolean = false;

  /**
   * Construtor del módulo que contiene el formulario para el registo
   * @param fb variable para acceder a FormBuilder
   * @param serviceFunciones variable para acceder a FuncionesService
   * @param serviceEstudiante variable para acceder a EstudianteService
   */
  constructor(
    private fb: FormBuilder,
    private serviceFunciones: FuncionesService,
    private serviceEstudiante: EstudianteService
  ) {
    this.formAdd = this.fb.group({
      nombre: "",
    })
  }

}
