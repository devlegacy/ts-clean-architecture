import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container, Lifecycle } from 'tsyringe'

import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  MongoCourseRepository
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure'
import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { MongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure'
import {
  MongoConfigFactory,
  RabbitMQConfig,
  RabbitMQConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import { CommandBus, EventBus } from '@/Contexts/Shared/domain'
import { CommandHandlers, InMemoryCommandBus } from '@/Contexts/Shared/infrastructure/CommandBus'
import {
  InMemoryAsyncEventBus,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter
} from '@/Contexts/Shared/infrastructure/EventBus'
import { MongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'

import { TYPES } from './types'

// let containerInstance: DependencyContainer | null = null

// const containerBuilder = () => {
//   if (containerInstance) return containerInstance
// Bootstrap global dependencies
// container.register<ConfigService>(TYPES.config, { useValue: config })

// Infrastructure
const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MongoClientFactory.createClient('mooc', mongoConfig)
container.register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
container.register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })

container.register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })

const rabbitConfig = RabbitMQConfigFactory.createConfig()
container.register<RabbitMQConfig>(TYPES.RabbitMQConfig, { useValue: rabbitConfig })
container.register<RabbitMQConnection>(TYPES.RabbitMQConnection, {
  useValue: new RabbitMQConnection(rabbitConfig)
})
container.register<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer, {
  useValue: new RabbitMQConfigurer(
    container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection),
    new RabbitMQQueueFormatter('mooc'),
    50
  )
})

container.register(TYPES.CommandHandler, CommandHandlers) // tagged commandHandler
container.register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus)

// Infrastructure
// container.register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
// container.register<Promise<DataSource>>(TYPES.TypeOrmClient, {
//   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
// })

// !String(process.env.npm_lifecycle_event).includes('tests')

// Domain - MongoRepository
container.register<CourseRepository>(TYPES.CourseRepository, MongoCourseRepository)
container.register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MongoCoursesCounterRepository)

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
