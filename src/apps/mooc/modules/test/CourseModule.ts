import { ContainerBuilder } from 'diod'

import { CourseController } from '@/apps/mooc/backend/controllers/CourseController'
import {
  CourseCreator,
  CoursesFinder,
  CreateCourseCommandHandler,
  SearchAllCoursesQueryHandler,
} from '@/Contexts/Mooc/Courses/application'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { MikroOrmMongoCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure'

import { TAGS } from '../tags'

export const CourseModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(CourseController).addTag(TAGS.Controller)
  builder.registerAndUse(CourseCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(CoursesFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(CreateCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(SearchAllCoursesQueryHandler).addTag(TAGS.QueryHandler)
  builder.register(CourseRepository).use(MikroOrmMongoCourseRepository)
}
