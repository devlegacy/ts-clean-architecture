import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { MikroORMMongoClientFactory, MongoConfig } from '@/Contexts/Shared/infrastructure/persistence'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure'
import { UserRepository } from '@/Contexts/User/Users/domain'
import { MongoUserRepository } from '@/Contexts/User/Users/infrastructure'

import { TYPES } from './types'

// Bootstrap global dependencies
// container.register<ConfigService>(TYPES.config, { useValue: config })

// Infrastructure
const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroORMMongoClientFactory.createClient('user', mongoConfig)
container.register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
container.register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })

// Domain - MongoRepository
container.register<UserRepository>(TYPES.UserRepository, MongoUserRepository)
