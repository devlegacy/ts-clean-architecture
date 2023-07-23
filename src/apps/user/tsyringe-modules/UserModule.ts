import { container } from 'tsyringe'

import { UserRepository } from '@/Contexts/User/Users/domain'
import { MikroOrmMongoUserRepository } from '@/Contexts/User/Users/infrastructure'

import { TYPES } from './types'

// Domain - MongoRepository
container
  // Domain layer
  // Repositories - Mongo
  .register<UserRepository>(TYPES.UserRepository, MikroOrmMongoUserRepository)
