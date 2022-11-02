export const TYPES = {
  // Infrastructure
  // Config
  config: 'config',
  // Mongo
  MongoConfig: 'MongoConfig',
  MongoClient: 'MongoClient',
  // TypeORM
  TypeOrmConfig: 'TypeOrmConfig',
  TypeOrmClient: 'TypeOrmClient',
  DataSource: 'DataSource',
  // EvenBus
  EventBus: 'EventBus',
  // Rabbit
  RabbitMQConfig: 'RabbitMQConfig',
  RabbitMQConnection: 'RabbitMQConnection',
  RabbitMQConfigurer: 'RabbitMQConfigurer',
  CommandBus: 'CommandBus',
  // QueryBus
  QueryBus: 'QueryBus',
  // Application
  // Subscribers
  DomainEventSubscriber: 'DomainEventSubscriber',
  // Command - application tag
  CommandHandler: 'CommandHandler',
  // Query - application tag
  QueryHandler: 'QueryHandler',
  // Domain
  CourseRepository: 'CourseRepository',
  CoursesCounterRepository: 'CoursesCounterRepository',
  // Test
  EnvironmentArranger: 'EnvironmentArranger'
}
