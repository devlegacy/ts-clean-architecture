import { ContainerBuilder } from 'diod'

import { CourseController } from '@/apps/mooc/backend/controllers/Courses/CourseController.js'
import {
  CourseCreator,
  CoursesFinder,
  CreateCourseCommandHandler,
  SearchAllCoursesQueryHandler,
} from '@/Contexts/Mooc/Courses/application/index.js'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/index.js'
import { MikroOrmMongoCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure/index.js'
import { registerController } from '@/Contexts/Shared/infrastructure/index.js'

import { TAGS } from '../tags.js'

export const CourseModule = (builder: ContainerBuilder) => {
  registerController(builder, CourseController)
  // builder.registerAndUse(CourseController).addTag(TAGS.Controller)
  builder.registerAndUse(CourseCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(CoursesFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(CreateCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(SearchAllCoursesQueryHandler).addTag(TAGS.QueryHandler)
  builder.register(CourseRepository).use(MikroOrmMongoCourseRepository)
}
