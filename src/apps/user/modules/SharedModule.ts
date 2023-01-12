import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger'
import { MikroOrmMongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure'

import { TYPES } from './types'

const context = 'user'

const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroOrmMongoClientFactory.createClient(context, mongoConfig)
const monitoring = undefined //new SentryModule({ options: SentryConfigFactory.createConfig() })
const logger = new PinoLogger({
  name: 'user',
  level: 'info'
})

// Infrastructure layer
container
  // Bootstrap global dependencies
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })
  .register(TYPES.Logger, { useValue: logger })
  .register(TYPES.Monitoring, { useValue: monitoring })
  .registerSingleton(FatalErrorHandler)
