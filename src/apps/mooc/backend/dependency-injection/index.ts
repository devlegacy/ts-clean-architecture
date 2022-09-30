import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  MongoCourseRepository
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure'
import {
  MongoConfigFactory
  // , TypeOrmConfigFactory
} from '@/Contexts/Mooc/Shared/infrastructure'
import {
  config,
  ConfigService,
  MongoClientFactory,
  MongoConfig
  // , TypeOrmClientFactory
  // , TypeOrmConfig
} from '@/Contexts/Shared/infrastructure'
import { EnvironmentArranger, MongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { TYPES } from './types'

// TODO: Inject dependencies or create dependency injector

// Bootstrap global dependencies
container.register<ConfigService>(TYPES.config, { useValue: config })

// Infrastructure
container.register<MongoConfig>(TYPES.MongoConfig, { useValue: MongoConfigFactory.createConfig() })
container.register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, {
  useValue: MongoClientFactory.createClient('mooc', container.resolve<MongoConfig>(TYPES.MongoConfig))
})
// Infrastructure
// container.register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
// container.register<Promise<DataSource>>(TYPES.TypeOrmClient, {
//   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
// })

// !String(process.env.npm_lifecycle_event).includes('tests')

// Domain - MongoRepository
container.register<CourseRepository>(TYPES.CourseRepository, {
  useValue: new MongoCourseRepository(container.resolve<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient))
})

// Domain - TypeOrmRepository
// container.register<CourseRepository>(TYPES.CourseRepository, {
//   useValue: new TypeOrmCourseRepository(container.resolve<Promise<DataSource>>(TYPES.TypeOrmClient))
// })

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, {
  useValue: new MongoEnvironmentArranger(container.resolve<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient))
})

export default container
