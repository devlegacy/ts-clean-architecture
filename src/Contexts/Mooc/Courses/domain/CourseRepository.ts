import {
  Criteria,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Course,
} from './Course.js'

export abstract class CourseRepository {
  // El átomo es Course, no recibir atributos para construir Course
  // async vs sync / declaramos algo asíncrono aun para implementaciones sincrónicas, no pesa en desarrollo, pero no es recomendado por Node.js
  abstract save(course: Course): Promise<void>

  abstract all(): Promise<Course[]>
  abstract search(criteria: Criteria): Promise<Course[]>
}
