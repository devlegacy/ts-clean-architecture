import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import { CreateCourseCommandHandler } from '@/Contexts/Mooc/Courses/application'
import { SearchAllCoursesQueryHandler } from '@/Contexts/Mooc/Courses/application/SearchAll'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  MongoCourseRepository
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure'
import { IncrementCoursesCounterOnCourseCreated } from '@/Contexts/Mooc/CoursesCounter/application'
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

const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MongoClientFactory.createClient('mooc', mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()

// Infrastructure
container
  // Bootstrap global dependencies
  // .register<ConfigService>(TYPES.config, { useValue: config })
  // MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })
  // .register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
  // .register<Promise<DataSource>>(TYPES.TypeOrmClient, {
  //   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
  // })
  // EventBus - InMemory - Infrastructure
  .register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })
  // RabbitMQ - EventBus
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
  // CommandBus - InMemory - Infrastructure
  .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus)
  // QueryBus - InMemory - Infrastructure
  .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus)

// Events
container.register(TYPES.DomainEventSubscriber, IncrementCoursesCounterOnCourseCreated)

// QueryHandler
container
  // Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCourseCommandHandler)

// QueryBus
container
  // Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllCoursesQueryHandler)

// Domain - TypeOrmRepositories
// container.register<CourseRepository>(TYPES.CourseRepository, {
//   useValue: new TypeOrmCourseRepository(container.resolve<Promise<DataSource>>(TYPES.TypeOrmClient))
// })

// Domain - MongoRepositories
container
  // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
  .register<CourseRepository>(TYPES.CourseRepository, MongoCourseRepository)
  .register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MongoCoursesCounterRepository)

// !String(process.env.npm_lifecycle_event).includes('tests')
// container.dispose()

// containerInstance = container
// return containerInstance
// }
// export { containerBuilder }
