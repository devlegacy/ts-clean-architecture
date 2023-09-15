import { container } from 'tsyringe'

import { UserRepository } from '@/Contexts/User/Users/domain/index.js'
import { MikroOrmMongoUserRepository } from '@/Contexts/User/Users/infrastructure/index.js'

import { TYPES } from './types.js'

// Domain - MongoRepository
container
  // Domain layer
  // Repositories - Mongo
  .register<UserRepository>(TYPES.UserRepository, MikroOrmMongoUserRepository)
