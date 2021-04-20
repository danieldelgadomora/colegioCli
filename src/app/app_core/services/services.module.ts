import { EstudianteService } from './colegio-service/estudiante.service';
import { ColegioService } from './colegio-service/colegio.service';
import { CursoService } from './colegio-service/curso.service';
import { AsignaturaService } from './colegio-service/asignatura.service';
import { FuncionesService } from './colegio-service/funciones.service';
import { NgModule } from '@angular/core';
import { ProfesorService } from './colegio-service/profesor.service';

@NgModule({
  providers: [
    ProfesorService,
    FuncionesService,
    AsignaturaService,
    CursoService,
    ColegioService,
    EstudianteService
  ]
})
export class ServicesModule {
  constructor() { }
}
