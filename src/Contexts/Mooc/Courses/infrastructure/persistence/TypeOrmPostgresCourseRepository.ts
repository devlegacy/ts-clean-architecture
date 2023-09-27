import { EntitySchema } from 'typeorm'

import { Criteria } from '@/Contexts/Shared/domain/index.js'
import { TypeOrmPostgresRepository } from '@/Contexts/Shared/infrastructure/Persistence/index.js'

import { Course, CourseRepository } from '../../domain/index.js'
import { CourseEntity } from './typeorm/postgres/CourseEntity.js'

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
