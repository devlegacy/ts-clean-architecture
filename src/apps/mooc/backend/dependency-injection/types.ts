export const TYPES = {
  // App
  config: Symbol.for('config'),
  MongoConfig: Symbol.for('MongoConfig'),
  MongoClient: Symbol.for('MongoClient'),
  TypeOrmConfig: Symbol.for('TypeOrmConfig'),
  TypeOrmClient: Symbol.for('TypeOrmClient'),
  CourseRepository: Symbol.for('CourseRepository'),

  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger')
}
