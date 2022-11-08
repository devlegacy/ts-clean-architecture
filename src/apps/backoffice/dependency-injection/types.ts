import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  // Domain
  CourseRepository: Symbol.for('CourseRepository'),
  CoursesCounterRepository: Symbol.for('CoursesCounterRepository'),
  BackofficeCourseRepository: Symbol.for('BackofficeCourseRepository'),
  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger')
}
