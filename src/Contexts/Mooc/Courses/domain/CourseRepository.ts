import { Criteria } from '@/Contexts/Shared/domain'

import { Course } from './Course'

export abstract class CourseRepository {
  // El átomo es Course, no recibir atributos para construir Course
  abstract save(course: Course): Promise<void>

  abstract all(): Promise<Course[]>
  abstract search(criteria: Criteria): Promise<Course[]>
}
