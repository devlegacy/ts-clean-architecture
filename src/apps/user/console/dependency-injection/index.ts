import 'reflect-metadata'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { ContainerBuilder } from 'diod'

import { MongoClientFactory } from '@/Contexts/Shared/infrastructure'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure'
import { UserRepository } from '@/Contexts/User/Users/domain'
import { MongoUserRepository } from '@/Contexts/User/Users/infrastructure'

const builder = new ContainerBuilder()
const MongoConfig = MongoConfigFactory.createConfig()
const MongoClient = MongoClientFactory.createClient('user', MongoConfig)
builder.register(Promise<MikroORM<MongoDriver>>).useInstance(MongoClient)
builder.register(UserRepository).use(MongoUserRepository)

// builder.registerAndUse(UserCreator)

export const container = builder.build()
