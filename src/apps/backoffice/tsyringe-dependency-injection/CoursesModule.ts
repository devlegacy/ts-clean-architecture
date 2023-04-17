import { container } from 'tsyringe'

import {
  CreateBackofficeCourseCommandHandler,
  CreateBackofficeCourseOnCourseCreated,
  DeleteBackofficeCourseCommandHandler,
  FindBackofficeCourseByCriteriaQueryHandler,
  PaginateBackofficeCoursesQueryHandler,
  SearchAllBackofficeCoursesQueryHandler,
  SearchBackofficeCoursesByCriteriaQueryHandler,
  UpdateBackofficeCourseCommandHandler,
} from '@/Contexts/Backoffice/Courses/application'
import { BackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/domain'
import { MikroOrmMongoBackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/infrastructure'
import { Command, ICommandHandler, Query, Response } from '@/Contexts/Shared/domain'

import { TYPES } from './types'

container
  // Application layer
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, CreateBackofficeCourseOnCourseCreated)
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, CreateBackofficeCourseCommandHandler)
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, DeleteBackofficeCourseCommandHandler)
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, UpdateBackofficeCourseCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllBackofficeCoursesQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchBackofficeCoursesByCriteriaQueryHandler)
  // .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindBackofficeCourseByCriteriaQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, PaginateBackofficeCoursesQueryHandler)
  // Domain layer
  // Repositories - Mongo
  // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
  // .register<CourseRepository>(TYPES.CourseRepository, MikroOrmMongoCourseRepository)
  // .register<BackofficeCourseRepository>(
  //   TYPES.MikroOrmMongoBackofficeCourseRepository,
  //   MikroOrmMongoBackofficeCourseRepository
  // )
  // .register<BackofficeCourseRepository>(TYPES.ElasticBackofficeCourseRepository, ElasticBackofficeCourseRepository)
  // .register<BackofficeCourseRepository>(TYPES.BackofficeCourseRepository, ProxyBackofficeCourseRepository)
  .register<BackofficeCourseRepository>(TYPES.BackofficeCourseRepository, MikroOrmMongoBackofficeCourseRepository)
