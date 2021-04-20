import { Estudiante } from './estudiante/estudiante.component';
import { ModalAddPersonas } from './modalAddPersonas/modal-add-personas.component';
import { Dashboard } from './dashboard/dashboard.component';
import { Curso } from './curso/curso.component';
import { AsignaturaDocente } from './asignatura-doc/asignatura-doc.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PanelModule } from 'primeng/panel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewsRoutes } from './colegio.routing';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule} from 'ngx-bootstrap/modal';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Profesor } from './profesor/profesor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ViewsRoutes),
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    TableModule,
    AutoCompleteModule,
    MatSelectModule,
    ModalModule.forRoot(),
    TooltipModule,
    MatInputModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    AsignaturaDocente,
    Curso,
    Dashboard,
    ModalAddPersonas,
    Estudiante,
    Profesor
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ],
})
export class ColegioModule { }
