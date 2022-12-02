export const SHARED_TYPES = {
  // Infrastructure
  // Config
  config: Symbol.for('config'),
  // Mongo
  MongoConfig: Symbol.for('MongoConfig'),
  MongoClient: Symbol.for('MongoClient'),
  // TypeORM
  TypeOrmConfig: Symbol.for('TypeOrmConfig'),
  TypeOrmClient: Symbol.for('TypeOrmClient'),
  DataSource: Symbol.for('DataSource'),
  // EvenBus
  EventBus: Symbol.for('EventBus'),
  // Rabbit
  RabbitMQConfig: Symbol.for('RabbitMQConfig'),
  RabbitMQConnection: Symbol.for('RabbitMQConnection'),
  RabbitMQConfigurer: Symbol.for('RabbitMQConfigurer'),
  CommandBus: Symbol.for('CommandBus'),
  // QueryBus
  QueryBus: Symbol.for('QueryBus'),
  // Application
  // Subscribers
  DomainEventSubscriber: Symbol.for('DomainEventSubscriber'),
  // Command - application tag
  CommandHandler: Symbol.for('CommandHandler'),
  // Query - application tag
  QueryHandler: Symbol.for('QueryHandler'),
  Monitoring: Symbol.for('Monitoring'),
  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger')
}
