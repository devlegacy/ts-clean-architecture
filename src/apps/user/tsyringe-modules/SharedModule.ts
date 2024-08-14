import {
  MikroORM,
} from '@mikro-orm/core'
import {
  MongoDriver,
} from '@mikro-orm/mongodb'
import {
  container,
} from 'tsyringe'

import {
  Monitoring,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'
import {
  PinoLogger,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'
import {
  MikroOrmMongoClientFactory, type MongoConfig,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/index.js'
import {
  MongoConfigFactory,
} from '#@/src/Contexts/User/Shared/infrastructure/index.js'

import {
  TYPES,
} from './types.js'

const context = 'user'

const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroOrmMongoClientFactory.createClient(context, mongoConfig)
const monitoring = {} as Monitoring // new SentryModule({ options: SentryConfigFactory.createConfig() })
const logger = new PinoLogger({
  name: 'user',
  level: 'info',
})

// Infrastructure layer
container
  // Bootstrap global dependencies
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, {
    useValue: mongoConfig,
  })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, {
    useValue: mongoClient,
  })
  .register(TYPES.Logger, {
    useValue: logger,
  })
  .register(TYPES.Monitoring, {
    useValue: monitoring,
  })
  .registerSingleton(FatalErrorHandler)
