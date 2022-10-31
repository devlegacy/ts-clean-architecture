export const SHARED_TYPES = {
  // Infrastructure
  // Config
  config: Symbol('config'),
  // Mongo
  MongoConfig: Symbol('MongoConfig'),
  MongoClient: Symbol('MongoClient'),
  // TypeORM
  TypeOrmConfig: Symbol('TypeOrmConfig'),
  TypeOrmClient: Symbol('TypeOrmClient'),
  DataSource: Symbol('DataSource'),
  // EvenBus
  EventBus: Symbol('EventBus'),
  // Rabbit
  RabbitMQConfig: Symbol('RabbitMQConfig'),
  RabbitMQConnection: Symbol('RabbitMQConnection'),
  RabbitMQConfigurer: Symbol('RabbitMQConfigurer'),
  CommandBus: Symbol('CommandBus'),
  // QueryBus
  QueryBus: Symbol('QueryBus'),
  // Application
  // Subscribers
  DomainEventSubscriber: Symbol('DomainEventSubscriber'),
  // Command - application tag
  CommandHandler: Symbol('CommandHandler'),
  // Query - application tag
  QueryHandler: Symbol('QueryHandler')
}
