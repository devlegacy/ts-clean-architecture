import { ContainerBuilder } from 'diod'

import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { MikroOrmMongoCoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/infrastructure'

export const CoursesCounterModule = (builder: ContainerBuilder) => {
  builder.register(CoursesCounterRepository).use(MikroOrmMongoCoursesCounterRepository)
}
