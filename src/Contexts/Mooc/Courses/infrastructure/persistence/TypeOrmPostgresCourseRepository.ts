import { EntitySchema } from 'typeorm'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { Criteria, Nullable } from '@/Contexts/Shared/domain'
import { TypeOrmPostgresRepository } from '@/Contexts/Shared/infrastructure/persistence'

import { Course, CourseRepository } from '../../domain'
import { CourseEntity } from './typeorm/postgres/CourseEntity'

export class TypeOrmPostgresCourseRepository extends TypeOrmPostgresRepository<Course> implements CourseRepository {
  async all(): Promise<Course[]> {
    return []
  }

  async searchBy(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  save(course: Course): Promise<void> {
    return this.persist(course)
  }

  async search(id: CourseId): Promise<Nullable<Course>> {
    const repository = await this.repository()

    const course = await repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      where: { id },
    })

    // const course = await repository.findOne({ id })

    return course
  }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity
  }
}
