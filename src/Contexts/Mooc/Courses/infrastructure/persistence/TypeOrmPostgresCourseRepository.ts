import {
  EntitySchema,
} from 'typeorm'

import {
  Course,
  CourseRepository,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  Criteria,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  TypeOrmPostgresRepository,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/postgres/index.js'

import {
  CourseEntity,
} from './typeorm/postgres/CourseEntity.js'

export class TypeOrmPostgresCourseRepository extends TypeOrmPostgresRepository<Course> implements CourseRepository {
  async all(): Promise<Course[]> {
    return []
  }

  async search(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  save(course: Course): Promise<void> {
    return this.persist(course)
  }

  // async search(id: CourseId): Promise<Nullable<Course>> {
  //   const repository = await this.repository()

  //   const course = await repository.findOne({
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     where: { id },
  //   })

  //   // const course = await repository.findOne({ id })

  //   return course
  // }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity
  }
}
