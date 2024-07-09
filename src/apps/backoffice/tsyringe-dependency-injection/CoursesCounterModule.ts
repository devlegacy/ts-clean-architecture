import {
  container,
} from 'tsyringe'

import {
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  MikroOrmMongoCoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/infrastructure/index.js'

import {
  TYPES,
} from './types.js'

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
