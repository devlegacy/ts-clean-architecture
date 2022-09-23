import 'reflect-metadata'

import { MongoClient } from 'mongodb'
import { container } from 'tsyringe'

// import { DataSource } from 'typeorm'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/CourseRepository'
import { MongoCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure/persistance/MongoCourseRepository'
// import { TypeOrmCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure/persistance/typeorm-course.repository'
import { MongoConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
// import { TypeOrmConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure/persistence/postgresql/typeorm-config.factory'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory'
import MongoConfig from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoConfig'
// import { TypeOrmClientFactory } from '@/Contexts/shared/infrastructure/persistance/typeorm/typeorm-client.factory'
// import TypeOrmConfig from '@/Contexts/shared/infrastructure/persistance/typeorm/typeorm-config'
import { config, ConfigService } from '@/shared/config'

import { TYPES } from './types'

// TODO: Inject dependencies or create dependency injector

// Bootstrap global dependencies

container.register<ConfigService>(TYPES.config, { useValue: config })

// Infrastructure
container.register<MongoConfig>(TYPES.MongoConfig, { useValue: MongoConfigFactory.createConfig() })
container.register<Promise<MongoClient>>(TYPES.MongoClient, {
  useValue: MongoClientFactory.createClient('mooc', container.resolve<MongoConfig>(TYPES.MongoConfig))
})

// Infrastructure
// container.register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
// container.register<Promise<DataSource>>(TYPES.TypeOrmClient, {
//   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
// })

// Domain - MongoRepository
container.register<CourseRepository>(TYPES.CourseRepository, {
  useValue: new MongoCourseRepository(container.resolve<Promise<MongoClient>>(TYPES.MongoClient))
})

// Domain - TypeOrmRepository
// container.register<CourseRepository>(TYPES.CourseRepository, {
//   useValue: new TypeOrmCourseRepository(container.resolve<Promise<DataSource>>(TYPES.TypeOrmClient))
// })

// TODO: Define test dependency injector
// Test

export default container
