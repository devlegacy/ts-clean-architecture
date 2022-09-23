import { Course } from './Course'

export interface CourseRepository {
  // El átomo es Course, no recibir atributos para construir Course
  save(course: Course): Promise<void>
}
