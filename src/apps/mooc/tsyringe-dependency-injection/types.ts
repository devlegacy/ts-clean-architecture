import { SHARED_TYPES } from '@/Contexts/Shared/domain'

export const TYPES = {
  ...SHARED_TYPES,
  // Domain
  CourseRepository: Symbol.for('CourseRepository'),
  CoursesCounterRepository: Symbol.for('CoursesCounterRepository'),
}
