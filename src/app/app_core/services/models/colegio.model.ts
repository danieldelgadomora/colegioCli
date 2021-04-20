export interface ColegioModel{
  id?: number;
  nombre: string;
  colegio?:[]
}

export interface CursoModel{
  id?: number,
  grado?: number,
  salon?: string,
  colegio?: ColegioModel,
  asignaturas?:{}
}
export interface ProfesorModel{
  id?: number,
  nombre?: string,
  asignatura?:{}
}

export interface AsignaturaModel{
  id?: number,
  nombre: string,
  profesor:ProfesorModel
  estudiante?:{},
  curso:CursoModel,
}

export interface EstudianteModel{
  id?: number,
  nombre: string,
  asignatura?: {}
}


