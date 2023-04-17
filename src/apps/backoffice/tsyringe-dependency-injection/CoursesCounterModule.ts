import { container } from 'tsyringe'

import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { MikroOrmMongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure'

import { TYPES } from './types'

// Application layer
container
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application

  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application

  // Domain layer

  // Repositories - Mongo
  .register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MikroOrmMongoCoursesCounterRepository)
