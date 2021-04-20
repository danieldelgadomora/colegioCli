import { EstudianteService } from './../../../app_core/services/colegio-service/estudiante.service';
import { ProfesorService } from './../../../app_core/services/colegio-service/profesor.service';
import { CursoService } from './../../../app_core/services/colegio-service/curso.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';


/**
 * Componente para el modulo de dashboard.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
export class Dashboard implements OnInit{

  /**
   * Variable donde se almacena la cantidad de cursos
   */
  numCurso: any;

  /**
   * Variable donde se almacena la cantidad de profesores
   */
   numProfesor: any;

   /**
    * Variable deonde se alamcena la cantidad de estudiantes
    */
   numEstudiante: any;

  /**
   * Constructor del módulo de dashboard
   * @param serviceCurso variable para acceder a CursoService
   * @param serviceProfesor variable para acceder a ProfesorService
   */
  constructor(
    private serviceCurso: CursoService,
    private serviceProfesor: ProfesorService,
    private serviceEstudiante: EstudianteService

  ) {}

  /**
   * Función que permite iniciar y cargar la información para el dashboard
   */
  async ngOnInit() {

    try {
      const estudiantes = await this.serviceEstudiante.getEstudiantesCol(1).toPromise();
      this.numEstudiante = estudiantes.length;
      const cursos = await this.serviceCurso.getCursosCol(1).toPromise();
      this.numCurso = cursos.length;
      const profesores = await this.serviceProfesor.getProfesores().toPromise();
      this.numProfesor = profesores.length;
    } catch (error) {

    }



  }

}
