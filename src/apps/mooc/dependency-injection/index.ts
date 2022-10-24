import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import { CreateCourseCommandHandler } from '@/Contexts/Mooc/Courses/application'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  MongoCourseRepository
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure'
import { FindCoursesCounterQueryHandler } from '@/Contexts/Mooc/CoursesCounter/application/Find'
import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { MongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure'
import {
  MongoConfigFactory,
  RabbitMQConfig,
  RabbitMQConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import {
  Command,
  CommandBus,
  CommandHandler,
  EventBus,
  Query,
  QueryBus,
  QueryHandler,
  Response
} from '@/Contexts/Shared/domain'
import { InMemoryCommandBus } from '@/Contexts/Shared/infrastructure/CommandBus'
import {
  InMemoryAsyncEventBus,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter
} from '@/Contexts/Shared/infrastructure/EventBus'
import { MongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { InMemoryQueryBus } from '@/Contexts/Shared/infrastructure/QueryBus'

import { TYPES } from './types'

// let containerInstance: DependencyContainer | null = null

// const containerBuilder = () => {
//   if (containerInstance) return containerInstance
// Bootstrap global dependencies
// container.register<ConfigService>(TYPES.config, { useValue: config })

// Infrastructure
// MongoClient
const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MongoClientFactory.createClient('mooc', mongoConfig)
container
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })

// InMemory - EventBus
container.register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })

// RabbitMQ - EventBus
const rabbitConfig = RabbitMQConfigFactory.createConfig()
container
  .register<RabbitMQConfig>(TYPES.RabbitMQConfig, { useValue: rabbitConfig })
  .register<RabbitMQConnection>(TYPES.RabbitMQConnection, {
    useValue: new RabbitMQConnection(rabbitConfig)
  })
  .register<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer, {
    useValue: new RabbitMQConfigurer(
      container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection),
      new RabbitMQQueueFormatter('mooc'),
      50
    )
  })

// Infrastructure
// container.register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
// container.register<Promise<DataSource>>(TYPES.TypeOrmClient, {
//   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
// })

// !String(process.env.npm_lifecycle_event).includes('tests')

// Domain - MongoRepositories
container
  .register<CourseRepository>(TYPES.CourseRepository, MongoCourseRepository)
  .register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MongoCoursesCounterRepository)

// container.register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })

// Domain - TypeOrmRepository
// container.register<CourseRepository>(TYPES.CourseRepository, {
//   useValue: new TypeOrmCourseRepository(container.resolve<Promise<DataSource>>(TYPES.TypeOrmClient))
// })
// container.dispose()

// containerInstance = container
// return containerInstance
// }
// export { containerBuilder }
// tagged commandHandler

// QueryHandler
container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCourseCommandHandler)
  .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus)

// QueryBus
container
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)
  .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus)
