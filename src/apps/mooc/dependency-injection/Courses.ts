import { container } from 'tsyringe'

import { SearchCoursesByCriteriaQueryHandler } from '@/Contexts/Backoffice/Courses/application'
import { CreateCourseCommandHandler, SearchAllCoursesQueryHandler } from '@/Contexts/Mooc/Courses/application'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  MongoCourseRepository
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure'
import { Command, CommandHandler, Query, QueryHandler, Response } from '@/Contexts/Shared/domain'

import { TYPES } from './types'

// Application layer
container
  // EventBus <-> EventSubscribers
  // CommandBus <-> CommandHandlers
  // Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCourseCommandHandler)
  // QueryBus <-> QueryHandlers
  // Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllCoursesQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchCoursesByCriteriaQueryHandler)

// Domain layer
container
  // Repositories - Mongo
  // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
  .register<CourseRepository>(TYPES.CourseRepository, MongoCourseRepository)
