export const SHARED_TYPES = {
  // Infrastructure
  // Config
  config: Symbol.for('config'),
  // Logger
  Logger: Symbol.for('Logger'),
  Monitoring: Symbol.for('Monitoring'),
  // Mongo
  MongoConfig: Symbol.for('MongoConfig'),
  MongoClient: Symbol.for('MongoClient'),
  // TypeOrm
  TypeOrmConfig: Symbol.for('TypeOrmConfig'),
  TypeOrmClient: Symbol.for('TypeOrmClient'),
  DataSource: Symbol.for('DataSource'),
  // Postgres
  PostgresConfig: Symbol.for('PostgresConfig'),
  PostgresClient: Symbol.for('PostgresClient'),
  // MikroOrmPostgres
  MikroOrmPostgresConfig: Symbol.for('MikroOrmPostgresConfig'),
  MikroOrmPostgresClient: Symbol.for('MikroOrmPostgresClient'),
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
  // Test
  EnvironmentArranger: Symbol.for('EnvironmentArranger')
}
