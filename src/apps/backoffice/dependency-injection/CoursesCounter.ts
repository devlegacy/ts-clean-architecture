import { container } from 'tsyringe'

import { IncrementCoursesCounterOnCourseCreated } from '@/Contexts/Mooc/CoursesCounter/application'
import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { MongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure'

import { TYPES } from './types'

// Application layer
container
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, IncrementCoursesCounterOnCourseCreated)
// 🚌 CommandBus <-> CommandHandlers
// 🏷 Tags - Application
// 🚌 QueryBus <-> QueryHandlers
// 🏷 Tags - Application

// Domain layer
container
  // Repositories - Mongo
  .register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MongoCoursesCounterRepository)
