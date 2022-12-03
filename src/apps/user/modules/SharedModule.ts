import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { MikroOrmMongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure'

import { TYPES } from './types'

const context = 'user'

const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroOrmMongoClientFactory.createClient(context, mongoConfig)

// Infrastructure layer
container
  // Bootstrap global dependencies
  // Database - MongoClient
  .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
  .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })
