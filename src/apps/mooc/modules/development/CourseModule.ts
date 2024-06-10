import {
  ContainerBuilder,
} from 'diod'

import {
  CourseController,
} from '#@/src/apps/mooc/backend/controllers/Courses/CourseController.js'
import {
  CourseCreator,
  CoursesFinder,
  CreateCourseCommandHandler,
  SearchAllCoursesQueryHandler,
} from '#@/src/Contexts/Mooc/Courses/application/index.js'
import {
  CourseRepository,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  MikroOrmMongoCourseRepository,
} from '#@/src/Contexts/Mooc/Courses/infrastructure/index.js'

// import {
//   registerController,
// } from '#@/src/Contexts/Shared/infrastructure/index.js'
import {
  TAGS,
} from '../tags.js'

export const CourseModule = (builder: ContainerBuilder) => {
  // registerController(
  //   builder,
  //   CourseController,
  // )
  builder.registerAndUse(CourseController).addTag(TAGS.Controller)
  builder.registerAndUse(CourseCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(CoursesFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(CreateCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(SearchAllCoursesQueryHandler).addTag(TAGS.QueryHandler)
  builder.register(CourseRepository).use(MikroOrmMongoCourseRepository)
}
