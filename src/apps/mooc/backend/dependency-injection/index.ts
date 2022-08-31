import 'reflect-metadata'

import { MongoClient } from 'mongodb'
import { container } from 'tsyringe'

// import { DataSource } from 'typeorm'
import { CourseRepository } from '@/contexts/mooc/courses/domain/course.repository'
import { MongoCourseRepository } from '@/contexts/mooc/courses/infrastructure/persistance/mongo-course.repository'
// import { TypeOrmCourseRepository } from '@/contexts/mooc/courses/infrastructure/persistance/typeorm-course.repository'
import { MongoConfigFactory } from '@/contexts/mooc/shared/infrastructure/persistence/mongo/mongo-config.factory'
// import { TypeOrmConfigFactory } from '@/contexts/mooc/shared/infrastructure/persistence/postgresql/typeorm-config.factory'
import { MongoClientFactory } from '@/contexts/shared/infrastructure/persistance/mongo/mongo-client.factory'
import MongoConfig from '@/contexts/shared/infrastructure/persistance/mongo/mongo-config'
// import { TypeOrmClientFactory } from '@/contexts/shared/infrastructure/persistance/typeorm/typeorm-client.factory'
// import TypeOrmConfig from '@/contexts/shared/infrastructure/persistance/typeorm/typeorm-config'
import { config, ConfigService } from '@/shared/config'

// TODO: Inject dependencies or create dependency injector

// Bootstrap global dependencies

container.register<ConfigService>('config', { useValue: config })

// Infrastructure
container.register<MongoConfig>('MongoConfig', { useValue: MongoConfigFactory.createConfig() })
container.register<Promise<MongoClient>>('MongoClient', {
  useValue: MongoClientFactory.createClient('mooc', container.resolve<MongoConfig>('MongoConfig'))
})

// Infrastructure
// container.register<TypeOrmConfig>('TypeOrmConfig', { useValue: TypeOrmConfigFactory.createConfig() })
// container.register<Promise<DataSource>>('TypeOrmClient', {
//   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>('TypeOrmConfig'))
// })

// Domain - MongoRepository
container.register<CourseRepository>('CourseRepository', {
  useValue: new MongoCourseRepository(container.resolve<Promise<MongoClient>>('MongoClient'))
})

// Domain - TypeOrmRepository
// container.register<CourseRepository>('CourseRepository', {
//   useValue: new TypeOrmCourseRepository(container.resolve<Promise<DataSource>>('TypeOrmClient'))
// })

// TODO: Define test dependency injector
// Test

export default container
