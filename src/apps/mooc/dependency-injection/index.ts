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
  MongoConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import { EventBus } from '@/Contexts/Shared/domain'
import {
  // config,
  // ConfigService,
  InMemoryAsyncEventBus,
  MongoClientFactory,
  MongoConfig
  // , TypeOrmClientFactory
  // , TypeOrmConfig
} from '@/Contexts/Shared/infrastructure'

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
