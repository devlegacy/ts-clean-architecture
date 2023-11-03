import { ContainerBuilder } from 'diod'

import {
  CoursesCounterFinder,
  CoursesCounterIncrementer,
  FindCoursesCounterQueryHandler,
  IncrementCoursesCounterOnCourseCreated,
} from '@/Contexts/Mooc/CoursesCounter/application/index.js'
import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'
import { MikroOrmMongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure/index.js'

import { CoursesCounterController } from '../../backend/controllers/CourseCounterController'
import { TAGS } from '../tags'

export const CoursesCounterModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(CoursesCounterController).addTag(TAGS.Controller)
  builder.registerAndUse(CoursesCounterIncrementer).addTag(TAGS.UseCase)
  builder.registerAndUse(IncrementCoursesCounterOnCourseCreated).addTag(TAGS.DomainEventSubscriber)
  builder.registerAndUse(CoursesCounterFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(FindCoursesCounterQueryHandler).addTag(TAGS.QueryHandler)
  builder.register(CoursesCounterRepository).use(MikroOrmMongoCoursesCounterRepository)
}
