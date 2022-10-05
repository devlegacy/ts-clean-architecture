// import { EntitySchema } from 'typeorm'

// import { CourseId } from '@/Contexts/Mooc/Shared/domain'
// import { Nullable } from '@/Contexts/Shared/domain'
// import { TypeOrmRepository } from '@/Contexts/Shared/infrastructure'

// import { Course, CourseRepository } from '../../domain'
// import { CourseEntity } from './typeorm/CourseEntity'

// export class TypeOrmCourseRepository extends TypeOrmRepository<Course> implements CourseRepository {
//   save(course: Course): Promise<void> {
//     return this.persist(course)
//   }

//   async search(id: CourseId): Promise<Nullable<Course>> {
//     const repository = await this.repository()

//     const course = await repository.findOne({
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       where: { id }
//     })

//     // const course = await repository.findOne({ id })

//     return course
//   }

//   protected entitySchema(): EntitySchema<Course> {
//     return CourseEntity
//   }
// }
