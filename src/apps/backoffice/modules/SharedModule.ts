import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import {
  LoggerConfigFactory,
  MongoConfigFactory,
  RabbitMQConfig,
  RabbitMQConfigFactory,
  RabbitMQEventBusFactory,
  SentryConfigFactory
} from '@/Contexts/Backoffice/Shared/infrastructure'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import {
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmMongoClientFactory,
  MikroOrmMongoDomainEventFailoverPublisher,
  MongoConfig,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQEventBus,
  RabbitMQQueueFormatter,
  SentryModule
} from '@/Contexts/Shared/infrastructure'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/logger'

import { TYPES } from './types'

const context = 'backoffice'

const mongoConfig = MongoConfigFactory.createConfig()
const mikroOrmMongo = MikroOrmMongoClientFactory.createClient(context, mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitFormatter = new RabbitMQQueueFormatter(context)
const rabbitConfigurer = new RabbitMQConfigurer(rabbitConnection, rabbitFormatter, 50)
const DomainEventFailoverPublisher = new MikroOrmMongoDomainEventFailoverPublisher(mikroOrmMongo)
const rabbitEventBus = RabbitMQEventBusFactory.create(
  DomainEventFailoverPublisher,
  rabbitConnection,
  rabbitFormatter,
  rabbitConfig
)
const monitoring = new SentryModule({ options: SentryConfigFactory.createConfig() })
const logger = new PinoLogger(LoggerConfigFactory.createConfig())

// Infrastructure layer
container
  // Bootstrap global dependencies
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mikroOrmMongo })
  // EventBus - RabbitMQ - Infrastructure
  .register<RabbitMQConfig>(TYPES.RabbitMQConfig, { useValue: rabbitConfig })
  .register<RabbitMQConnection>(TYPES.RabbitMQConnection, { useValue: rabbitConnection })
  .register<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer, { useValue: rabbitConfigurer })
  .register<RabbitMQEventBus>(TYPES.EventBus, { useValue: rabbitEventBus })
  // CommandBus - InMemory - Infrastructure
  .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus, { lifecycle: Lifecycle.Singleton })
  // QueryBus - InMemory - Infrastructure
  .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus, { lifecycle: Lifecycle.Singleton })
  // Monitoring
  .register(TYPES.Monitoring, { useValue: monitoring })
  .register(TYPES.Logger, { useValue: logger })
