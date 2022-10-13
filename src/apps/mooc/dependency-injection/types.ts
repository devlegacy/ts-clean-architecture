import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure'

export const TYPES = {
  ...SHARED_TYPES,
  EventBus: Symbol('EventBus'),
  CourseRepository: Symbol('CourseRepository'),
  CoursesCounterRepository: Symbol('CoursesCounterRepository'),
  // Test
  EnvironmentArranger: Symbol('EnvironmentArranger')
}
