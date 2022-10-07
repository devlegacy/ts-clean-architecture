import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure'

export const TYPES = {
  ...SHARED_TYPES,
  CourseRepository: Symbol('CourseRepository'),
  // Test
  EnvironmentArranger: Symbol('EnvironmentArranger')
}
