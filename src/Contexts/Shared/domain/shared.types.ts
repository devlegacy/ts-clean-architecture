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
  // Redis
  RedisConfig: Symbol.for('RedisConfig'),
  RedisClient: Symbol.for('RedisClient'),
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
  MikroOrmMongoEnvironmentArranger: Symbol.for('MikroOrmMongoEnvironmentArranger'),
}

export const SHARED_TAGS = {
  Controller: 'Controller',
  QueryHandler: 'QueryHandler',
  CommandHandler: 'CommandHandler',
  UseCase: 'UseCase',
  DomainEventSubscriber: 'DomainEventSubscriber',
} as const

export const COMMAND_METADATA = '__command__'
export const COMMAND_HANDLER_METADATA = '__commandHandler__'
export const QUERY_METADATA = '__query__'
export const QUERY_HANDLER_METADATA = '__queryHandler__'
export const EVENT_METADATA = '__event__'
export const EVENTS_HANDLER_METADATA = '__eventsHandler__'
