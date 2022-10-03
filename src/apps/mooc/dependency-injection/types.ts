import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure'

export const TYPES = {
  ...SHARED_TYPES,
  CourseRepository: Symbol.for('CourseRepository'),
  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger')
}
