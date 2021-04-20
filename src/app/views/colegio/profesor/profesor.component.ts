import { ProfesorService } from '../../../app_core/services/colegio-service/profesor.service';
import { EstudianteService } from '../../../app_core/services/colegio-service/estudiante.service';
import { FuncionesService } from '../../../app_core/services/colegio-service/funciones.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


/**
 * Componente para el modulo de profesor.
 */
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class Profesor implements OnInit{

  /**
   * variable donde se almancenan los profesores
   */
  profesores: any;

  /**
   * Variable que contiene las funciones de BsModalRef
   */
   modalRef: BsModalRef;


  /**
   * Variable boolenana para mostrar el mensaje de requerido
   */
   msgReq: Boolean = false;


  /**
   * Constructor del módulo de Estudiante
   * @param fb variable para acceder a FormBuilder
   * @param serviceFunciones varaible para acceder a FuncionesService
   * @param serviceProfesor variable para acceder a ProfesorService
   * @param serviceModal variable para acceder a BsModalService
   */
  constructor(
    private fb: FormBuilder,
    private serviceProfesor: ProfesorService,
    private serviceModal: BsModalService,
    private serviceFunciones: FuncionesService
  ) {

  }

  /**
   * Función que permite iniciar y cargar los cursos
   */
  async ngOnInit() {

    try {
      this.profesores = await this.serviceProfesor.getProfesores().toPromise()
      this.profesores.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Función que permite abrir el modal para adicionar un curso
   * @param template  variable que contine el modal
   */
   modalAddProfesor(template: TemplateRef<any>){
    this.modalRef = this.serviceModal.show(template,Object.assign({}, { class: 'modal-lg' }));
  }

  async btnAddProfesor(infoPer){
    console.log("Info per",infoPer.formAdd.value.nombre)
    try {
      if(infoPer.formAdd.value.nombre != ''){
        let profesor = await this.serviceProfesor.createProfesor(infoPer.formAdd.value).toPromise()
        this.ngOnInit()
        this.serviceFunciones.mensajeExito('El profesor se adicionó exitosamente')
        this.modalRef.hide()
      }else{
        this.msgReq = true;
      }
    } catch (error) {
      console.log(error)
    }

  }
}
