import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  // Domain
  CourseRepository: Symbol('CourseRepository'),
  CoursesCounterRepository: Symbol('CoursesCounterRepository'),
  // Test
  EnvironmentArranger: Symbol('EnvironmentArranger')
}
