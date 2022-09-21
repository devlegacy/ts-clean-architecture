import { EntitySchema } from 'typeorm'

import { Course } from '@/contexts/mooc/courses/domain/course'
import { CourseRepository } from '@/contexts/mooc/courses/domain/course.repository'
import { CourseId } from '@/contexts/mooc/shared/domain/courses/CourseId'
import { Nullable } from '@/contexts/shared/domain/nullable'
import { TypeOrmRepository } from '@/contexts/shared/infrastructure/persistance/typeorm/typeorm.repository'

import { CourseEntity } from './typeorm/course.entity'

export class TypeOrmCourseRepository extends TypeOrmRepository<Course> implements CourseRepository {
  save(course: Course): Promise<void> {
    return this.persist(course)
  }

  async search(id: CourseId): Promise<Nullable<Course>> {
    const repository = await this.repository()

    const course = await repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      where: { id }
    })

    return course
  }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity
  }
}
