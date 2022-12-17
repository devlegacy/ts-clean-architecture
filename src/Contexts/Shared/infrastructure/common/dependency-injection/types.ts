export const SHARED_TYPES = {
  // Infrastructure
  // Config
  config: Symbol.for('config'),
  // Logger
  Logger: Symbol.for('Logger'),
  Monitoring: Symbol.for('Monitoring'),
  // Domain
  ConnectionClient: Symbol.for('ConnectionClient'), // any connection vs ConnectionManager
  // Mongo
  MongoConfig: Symbol.for('MongoConfig'),
  MongoClient: Symbol.for('MongoClient'), // Client vs Manager
  // TypeOrm
  TypeOrmConfig: Symbol.for('TypeOrmConfig'),
  TypeOrmClient: Symbol.for('TypeOrmClient'), // Client vs Manager
  DataSource: Symbol.for('DataSource'),
  // Postgres
  PostgresConfig: Symbol.for('PostgresConfig'),
  PostgresClient: Symbol.for('PostgresClient'), // Client vs Manager
  // MikroOrmPostgres
  MikroOrmPostgresConfig: Symbol.for('MikroOrmPostgresConfig'),
  MikroOrmPostgresClient: Symbol.for('MikroOrmPostgresClient'),
  ElasticConfig: Symbol.for('ElasticConfig'),
  ElasticClient: Symbol.for('ElasticClient'), // Client vs Manager
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
  // Specific by domain
  EnvironmentArranger: Symbol.for('EnvironmentArranger'),
  // Specific by infrastructure
  MongoEnvironmentArranger: Symbol.for('MongoEnvironmentArranger'),
  TypeOrmPostgresEnvironmentArranger: Symbol.for('TypeOrmPostgresEnvironmentArranger'),
  MikroOrmPostgresEnvironmentArranger: Symbol.for('MikroOrmPostgresEnvironmentArranger'),
  MikroOrmMongoEnvironmentArranger: Symbol.for('MikroOrmMongoEnvironmentArranger')
}
