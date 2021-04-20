import { Curso } from './../curso/curso.component';
import { AsignaturaService } from './../../../app_core/services/colegio-service/asignatura.service';
import { EstudianteService } from './../../../app_core/services/colegio-service/estudiante.service';
import { FuncionesService } from './../../../app_core/services/colegio-service/funciones.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


/**
 * Componente para el modulo de curso.
 */
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
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
export class Estudiante implements OnInit{

  /**
   * variable donde se almancenan los estudiantes
   */
  estudiantes: any;

  /**
   * Variable que contiene las funciones de BsModalRef
   */
   modalRef: BsModalRef;

   /**
   * Varible que contiene los valores del formulario
   */
  formAddEstudiante: FormGroup

  /**
   * Variable boolenana para mostrar el mensaje de requerido
   */
   msgReq: Boolean = false;

   /**
    * Variable que contiene las asignaturas
    */
  asignaturas: any;

  /**
   * Constructor del módulo de Estudiante
   * @param fb variable para acceder a FormBuilder
   * @param serviceFunciones varaible para acceder a FuncionesService
   * @param cursoService variable para acceder a CursoService
   * @param serviceModal variable para acceder a BsModalService
   */
  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private serviceModal: BsModalService,
    private serviceFunciones: FuncionesService,
    private serviceAsignatura: AsignaturaService
  ) {
    this.formAddEstudiante = this.fb.group({
      nombre: "",
      curso:0
    })
  }

  /**
   * Función que permite iniciar y cargar los cursos
   */
  async ngOnInit() {

    try {
      this.estudiantes = await this.estudianteService.getEstudiantesCol(1).toPromise()
      this.estudiantes.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
      this.asignaturas = await this.serviceAsignatura.getAsignaturasColegio(1).toPromise();
      console.log("Asignaturas",this.asignaturas)
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Función que permite abrir el modal para adicionar un estudiante
   * @param template  variable que contine el modal
   */
   modalAddEstudiante(template: TemplateRef<any>){
    this.modalRef = this.serviceModal.show(template,Object.assign({}, { class: 'modal-lg' }));
  }

  /**
   * Función para adicionar un estudiante y matricular a una asignatura
   */
  async btnAddEstudiante(){

    let infoEst = {
      "nombre":this.formAddEstudiante.value.nombre
    }
    try {

      if(this.formAddEstudiante.value.nombre != "" && this.formAddEstudiante.value.curso != 0){
        let estudiante = await this.estudianteService.createMatricula(infoEst,this.formAddEstudiante.value.curso).toPromise();
        this.ngOnInit()
        this.serviceFunciones.mensajeExito("El estudiante se adicionó exitosamente")
        this.modalRef.hide()
      }else{
        this.msgReq = true;
      }


    } catch (error) {
      console.log(error)
    }

  }
}
