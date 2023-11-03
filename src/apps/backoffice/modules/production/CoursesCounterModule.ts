import { ContainerBuilder } from 'diod'

import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'
import { MikroOrmMongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure/index.js'

export const CoursesCounterModule = (builder: ContainerBuilder) => {
  builder.register(CoursesCounterRepository).use(MikroOrmMongoCoursesCounterRepository)
}
