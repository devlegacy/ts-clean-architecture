import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import {
  MongoConfigFactory,
  RabbitMQConfig,
  RabbitMQConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import { CommandBus, EventBus, QueryBus } from '@/Contexts/Shared/domain'
import { InMemoryCommandBus } from '@/Contexts/Shared/infrastructure/CommandBus'
import {
  InMemoryAsyncEventBus,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter
} from '@/Contexts/Shared/infrastructure/EventBus'
import { MikroORMMongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { InMemoryQueryBus } from '@/Contexts/Shared/infrastructure/QueryBus'

import { TYPES } from './types'

const context = 'mooc'
const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroORMMongoClientFactory.createClient(context, mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitFormatter = new RabbitMQQueueFormatter(context)
const rabbitConfigurer = new RabbitMQConfigurer(rabbitConnection, rabbitFormatter, 50)
// Infrastructure layer
container
  // Bootstrap global dependencies
  // .register<ConfigService>(TYPES.config, { useValue: config })
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })
  // .register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
  // .register<Promise<DataSource>>(TYPES.TypeOrmClient, {
  //   useValue: TypeOrmClientFactory.createClient(context, container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
  // })
  // EventBus - InMemory - Infrastructure
  .register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })
  // RabbitMQ - EventBus
  .register<RabbitMQConfig>(TYPES.RabbitMQConfig, { useValue: rabbitConfig })
  .register<RabbitMQConnection>(TYPES.RabbitMQConnection, { useValue: rabbitConnection })
  .register<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer, { useValue: rabbitConfigurer })
  // CommandBus - InMemory - Infrastructure
  .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus, { lifecycle: Lifecycle.Singleton })
  // QueryBus - InMemory - Infrastructure
  .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus, { lifecycle: Lifecycle.Singleton })
