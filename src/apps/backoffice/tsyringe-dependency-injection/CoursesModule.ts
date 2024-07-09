import {
  container,
} from 'tsyringe'

import {
  CreateBackofficeCourseCommandHandler,
  CreateBackofficeCourseOnCourseCreated,
  DeleteBackofficeCourseCommandHandler,
  FindBackofficeCourseByCriteriaQueryHandler,
  GetPaginatedBackofficeCoursesQueryHandler,
  SearchAllBackofficeCoursesQueryHandler,
  SearchBackofficeCoursesByCriteriaQueryHandler,
  UpdateBackofficeCourseCommandHandler,
} from '#@/src/Contexts/Backoffice/Courses/application/index.js'
import {
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  MikroOrmMongoBackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/infrastructure/index.js'
import {
  Command,
  type CommandHandler,
  Query,
  type QueryHandler,
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  TYPES,
} from './types.js'

container
  // Application layer
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, CreateBackofficeCourseOnCourseCreated)
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateBackofficeCourseCommandHandler)
  .register<CommandHandler<Command>>(TYPES.CommandHandler, DeleteBackofficeCourseCommandHandler)
  .register<CommandHandler<Command>>(TYPES.CommandHandler, UpdateBackofficeCourseCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllBackofficeCoursesQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchBackofficeCoursesByCriteriaQueryHandler)
  // .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindBackofficeCourseByCriteriaQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, GetPaginatedBackofficeCoursesQueryHandler)
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
