import { Estudiante } from './../estudiante/estudiante.component';
import { EstudianteService } from './../../../app_core/services/colegio-service/estudiante.service';
import { AsignaturaModel } from './../../../app_core/services/models/colegio.model';
import { CursoService } from './../../../app_core/services/colegio-service/curso.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AsignaturaService } from './../../../app_core/services/colegio-service/asignatura.service';
import { ProfesorService } from './../../../app_core/services/colegio-service/profesor.service';
import { FuncionesService } from './../../../app_core/services/colegio-service/funciones.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


/**
 * Componente para el modulo de asinatura.
 */
@Component({
  selector: 'app-asignatura-doc',
  templateUrl: './asignatura-doc.component.html',
  styleUrls: ['./asignatura-doc.component.scss'],
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
export class AsignaturaDocente implements OnInit{

  /**
   * Variable que contiene el formulario de los profesores
   */
   formProfesor: FormGroup

   /**
   * Variable que contiene el formulario de asignaturas
   */
  formAsignatura: FormGroup

  /**
   * Variable que contiene el formulario de matriculas de estudiantes antiguos
   */
   formMatriAnt: FormGroup

  /**
   * Variable donde se alamacenan los profesores
   */
  profesores: any;

  /**
   * Variable donde se alamacenan las asignaturas
   */
   asignaturas: any;

   /**
   * Variable donde se alamacenan los cursos
   */
    cursos: any;

    /**
     * Variable donde se almacena los estudiantes
     */
    estudiantes: any;

   /**
   * Variable que contiene las funciones de BsModalRef
   */
    modalRef: BsModalRef;

    /**
   * Variable boolenana para mostrar el mensaje de requerido
   */
   msgReq: Boolean = false;

   /**
   * Variable de tipo AsignaturaModel que contiene a asignatura a adicionar
   */
   asignatura: AsignaturaModel

   /**
    * Variable donde se almacena la información de la asignatura seleccionada
    */
   asignaturaSelect: any;

  /**
   * Constructor del módulo de asignatura
   * @param fb variable para acceder a FormBuilder
   * @param serviceProfesores variable para acceder a ProfesorService
   * @param serviceFunciones varaible para acceder a FuncionesService
   */
  constructor(
    private fb: FormBuilder,
    private serviceProfesores: ProfesorService,
    private serviceFunciones: FuncionesService,
    private serviceModal: BsModalService,
    private serviceAsignatura: AsignaturaService,
    private serviceCurso: CursoService,
    private serviceEstudiante: EstudianteService
  ) {
    this.formProfesor = this.fb.group({
      profesor: 0
    })
    this.formAsignatura = this.fb.group({
      nombre: "",
      curso:1
    })
    this.formMatriAnt = this.fb.group({
      estudiante:0
    })
  }

  /**
   * Función que permite iniciar y cargar los profesores
   */
  async ngOnInit() {
    try {
      this.profesores = await this.serviceProfesores.getProfesores().toPromise()
      this.cursos = await this.serviceCurso.getCursosCol(1).toPromise()
      this.estudiantes = await this.serviceEstudiante.getEstudiantesCol(1).toPromise();
      console.log("Estudiantes",this.estudiantes)
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Función que carga la información de las asignaturas del docente selecionado
   */
  async selectProfesor(){
    try {
      this.asignaturas = await this.serviceAsignatura.getAsignaturasDocente(this.formProfesor.value.profesor).toPromise()

      let estudiantes = [];

      for(let asig of this.asignaturas){
          if(asig.ESTUDIANTES){
            estudiantes = asig.ESTUDIANTES.split(',');
            asig.estMat = new Array;
            for(let est of estudiantes){
              await asig.estMat.push({'nombre':est})
            }
          }
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Función que permite abrir el modal para adicionar una asignatura
   * @param template  variable que contine el modal
   */
   modalAddAsignatura(template: TemplateRef<any>){
    this.modalRef = this.serviceModal.show(template,Object.assign({}, { class: 'modal-lg' }));
  }


/**
 * Función que permite adicionar una asignatura
 */
  async btnAddAsignatura(){
    try {

      if(this.formAsignatura.value.nombre != ""){
        let asig = {
          "nombre":this.formAsignatura.value.nombre,
          "profesor":{"id": this.formProfesor.value.profesor},
          "curso":{"id":this.formAsignatura.value.curso}
        }
        this.asignatura = asig;
        const addAsig = await this.serviceAsignatura.createAsignatura(this.asignatura).toPromise()
        this.serviceFunciones.mensajeExito("La asignatura se adicionó exitosamente")
        this.asignaturas = await this.serviceAsignatura.getAsignaturasDocente(this.formProfesor.value.profesor).toPromise()
        this.modalRef.hide()
      }else{
        this.msgReq = true;
      }


    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Función que permite abir el modal para matricular estudiantes antiguos
   * @param template Varialbe que contiene el modal
   * @param asignatura Variable que contiene la asignatura seleccionada
   */
  modalAddMatriculaAnt(template: TemplateRef<any>,asignatura){
    this.modalRef = this.serviceModal.show(template,Object.assign({}, { class: 'modal-lg' }));
    this.asignaturaSelect = asignatura;
    console.log(asignatura)
    for(let i = 0; i<asignatura.estMat.length;i++){
      for(let j = 0; j<this.estudiantes.length; j++){
       if(asignatura.estMat[i].nombre == this.estudiantes[j].NOMBRE){
          this.estudiantes.splice([j],1)
        }
      }
    }
  }


  /**
   * Dunción que permite adicionar una matrícula de un estudiante antiguo
   */
  async btnAddMatriculaAnt(){
    try {

      if(this.formMatriAnt.value.estudiante != 0){
        let matriAnt = await this.serviceEstudiante.createMatriculaAnt(this.asignaturaSelect.ID_ASIGNATURA,this.formMatriAnt.value.estudiante).toPromise()
        this.selectProfesor()
        this.serviceFunciones.mensajeExito("El estudiante se matriculó exitosamente")
        this.modalRef.hide()
        this.formMatriAnt.value.estudiante = 0
      }else{
        this.msgReq = true;
      }
    } catch (error) {
      console.log(error)
    }

  }

}
