import { Estudiante } from './estudiante/estudiante.component';
import { Curso } from './curso/curso.component';
import { AsignaturaDocente } from './asignatura-doc/asignatura-doc.component';
import { Routes } from '@angular/router';
import { Profesor } from './profesor/profesor.component';

export const ViewsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'COLEGIO'
    },
    children: [

      {
        path: 'asignaturadoc',
        component: AsignaturaDocente,
        data: {
          title: 'Asignatura Docente'
        }
      },
      {
        path: 'curso',
        component: Curso,
        data: {
          title: 'Curso'
        }
      },
      {
        path: 'estudiante',
        component: Estudiante,
        data: {
          title: 'Estudiante'
        }
      },
      {
        path: 'profesor',
        component: Profesor,
        data: {
          title: 'Profesor'
        }
      },

    ]
  }
];
