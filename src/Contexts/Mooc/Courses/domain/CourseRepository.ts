import { Criteria } from '@/Contexts/Shared/domain'

import { Course } from './Course'

export interface CourseRepository {
  // El átomo es Course, no recibir atributos para construir Course
  save(course: Course): Promise<void>
  findBy(criteria: Criteria): Promise<Course[]>
}
