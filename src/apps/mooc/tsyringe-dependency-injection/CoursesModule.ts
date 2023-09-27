import { container } from 'tsyringe'

import { CreateCourseCommandHandler, SearchAllCoursesQueryHandler } from '@/Contexts/Mooc/Courses/application/index.js'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/index.js'
import {
  MikroOrmMongoCourseRepository,
  // , TypeOrmCourseRepository
} from '@/Contexts/Mooc/Courses/infrastructure/index.js'
import { FindCoursesCounterQueryHandler } from '@/Contexts/Mooc/CoursesCounter/application/index.js'
import { Command, type CommandHandler, Query, type QueryHandler, Response } from '@/Contexts/Shared/domain/index.js'

import { TYPES } from './types.js'

// Application layer
container
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCourseCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllCoursesQueryHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)

// Domain layer
container
  // Repositories - Mongo
  // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
  .register<CourseRepository>(TYPES.CourseRepository, MikroOrmMongoCourseRepository)
