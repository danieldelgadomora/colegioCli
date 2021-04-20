import { CursoModel } from './../../../app_core/services/models/colegio.model';
import { FuncionesService } from './../../../app_core/services/colegio-service/funciones.service';
import { CursoService } from './../../../app_core/services/colegio-service/curso.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


/**
 * Componente para el modulo de curso.
 */
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
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
export class Curso implements OnInit{

  /**
   * variable donde se almancenan los cursos
   */
  cursos: any;

  /**
   * Variable que contiene las funciones de BsModalRef
   */
   modalRef: BsModalRef;

   /**
   * Varible que contiene los valores del formulario para agregar un curso
   */
  formCurso: FormGroup

  /**
   * Variable boolenana para mostrar el mensaje de requerido
   */
   msgReq: Boolean = false;

   /**
    * varaible que contiene el curso creado
    */
   curso: CursoModel;

  /**
   * Constructor del módulo de curso
   * @param fb variable para acceder a FormBuilder
   * @param serviceFunciones varaible para acceder a FuncionesService
   * @param cursoService variable para acceder a CursoService
   * @param serviceModal variable para acceder a BsModalService
   */
  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private serviceModal: BsModalService,
    private serviceFunciones: FuncionesService
  ) {
    this.formCurso = this.fb.group({
      grado: "",
      salon: "",
      colegio:{
        "id":1,
        "nombre":"El colegio del Olimpo"
      }
    })
  }

  /**
   * Función que permite iniciar y cargar los cursos
   */
  async ngOnInit() {

    try {
      this.cursos = await this.cursoService.getCursos().toPromise()
      this.cursos.sort((a,b) => (a.grado > b.grado) ? 1 : ((b.grado > a.grado) ? -1 : 0));
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Función que permite abrir el modal para adicionar un curso
   * @param template  variable que contine el modal
   */
   modalAddCurso(template: TemplateRef<any>){
    this.modalRef = this.serviceModal.show(template,Object.assign({}, { class: 'modal-lg' }));
  }

  /**
   * Función qie permite adicionar un curso
   */
  btnAddCurso(){
    if(this.formCurso.value.grado != "" && this.formCurso.value.curso != ""){
      this.curso = this.formCurso.value;
      try {
        let curso = this.cursoService.createCurso(this.curso).toPromise();
        this.serviceFunciones.mensajeExito('El curso se adicionó exitosamente')
        this.modalRef.hide()
        this.ngOnInit()
      } catch (error) {
        console.log(error)
      }
    }else{
      this.msgReq = true;
    }
  }

}
