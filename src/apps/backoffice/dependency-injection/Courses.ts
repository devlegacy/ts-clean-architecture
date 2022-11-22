import { container } from 'tsyringe'

import {
  BackofficeCreateCourseCommandHandler,
  CreateBackofficeCourseOnCourseCreated,
  SearchAllBackofficeCoursesQueryHandler,
  SearchBackofficeCoursesByCriteriaQueryHandler
} from '@/Contexts/Backoffice/Courses/application'
import { BackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/domain'
import { MikroOrmMongoBackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/infrastructure'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { MikroOrmMongoCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure'
import { FindCoursesCounterQueryHandler } from '@/Contexts/Mooc/CoursesCounter/application'
import { Command, CommandHandler, Query, QueryHandler, Response } from '@/Contexts/Shared/domain'

import { TYPES } from './types'

container
  // Application layer
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, CreateBackofficeCourseOnCourseCreated)
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, BackofficeCreateCourseCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllBackofficeCoursesQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchBackofficeCoursesByCriteriaQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)

  // Domain layer
  // Repositories - Mongo
  // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
  .register<CourseRepository>(TYPES.CourseRepository, MikroOrmMongoCourseRepository)
  .register<BackofficeCourseRepository>(TYPES.BackofficeCourseRepository, MikroOrmMongoBackofficeCourseRepository)
