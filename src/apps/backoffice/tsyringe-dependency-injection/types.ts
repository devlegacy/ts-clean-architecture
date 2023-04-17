import { SHARED_TYPES } from '@/Contexts/Shared/domain'

export const TYPES = {
  ...SHARED_TYPES,
  // Domain
  CourseRepository: Symbol.for('CourseRepository'),
  CoursesCounterRepository: Symbol.for('CoursesCounterRepository'),
  MikroOrmMongoBackofficeCourseRepository: Symbol.for('MikroOrmMongoBackofficeCourseRepository'),
  ElasticBackofficeCourseRepository: Symbol.for('ElasticBackofficeCourseRepository'),
  BackofficeCourseRepository: Symbol.for('BackofficeCourseRepository'),
  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger'),
}
