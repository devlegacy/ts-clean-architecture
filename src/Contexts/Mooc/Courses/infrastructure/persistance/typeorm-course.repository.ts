import { EntitySchema } from 'typeorm'

import { Course } from '@/Contexts/Mooc/Courses/domain/Course'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/course.repository'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { Nullable } from '@/Contexts/Shared/domain/nullable'
import { TypeOrmRepository } from '@/Contexts/Shared/infrastructure/persistance/typeorm/typeorm.repository'

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
