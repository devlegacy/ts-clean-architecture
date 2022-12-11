import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import {
  MongoConfigFactory,
  RabbitMQConfig,
  RabbitMQConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import { SentryConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure/monitoring'
import { RabbitMQEventBusFactory } from '@/Contexts/Mooc/Shared/infrastructure/RabbitMQ'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { InMemoryCommandBus } from '@/Contexts/Shared/infrastructure/CommandBus'
import {
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQEventBus,
  RabbitMQQueueFormatter
} from '@/Contexts/Shared/infrastructure/EventBus'
import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'
import { MikroOrmMongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { InMemoryQueryBus } from '@/Contexts/Shared/infrastructure/QueryBus'
import { SentryModule } from '@/Contexts/Shared/infrastructure/sentry'

import { TYPES } from './types'

const context = 'mooc'
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

// Infrastructure layer
container
  // Bootstrap global dependencies
  // .register<ConfigService>(TYPES.config, { useValue: config })
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mikroOrmMongo })
  // .register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
  // .register<Promise<DataSource>>(TYPES.TypeOrmClient, {
  //   useValue: TypeOrmClientFactory.createClient(context, container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
  // })
  // EventBus - InMemory - Infrastructure
  // .register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })
  // RabbitMQ - EventBus
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
