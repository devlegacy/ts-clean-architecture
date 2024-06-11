import {
  ContainerBuilder,
} from 'diod'

import {
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  MikroOrmMongoCoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/infrastructure/index.js'

export const CoursesCounterModule = (builder: ContainerBuilder) => {
  builder.register(CoursesCounterRepository).use(MikroOrmMongoCoursesCounterRepository)
}
