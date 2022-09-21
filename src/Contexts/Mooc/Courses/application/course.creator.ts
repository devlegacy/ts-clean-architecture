/**
 * Note: Always import of domain never *Infrastructure*
 *
 * Todas las capas de nuestra arquitectura más externas solo deberían depender de las capas más internas
 *  - (infraestructura -> application -> domain)
 *
 * Esta premisa debe garantizar:
 *  - Si cambiamos algo de infraestructura (no hay que modificar) no se afecta el comportamiento del dominio
 */

import { inject, injectable } from 'tsyringe'

import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

import { CourseDuration } from '../../shared/domain/courses/CourseDuration'
import { CourseName } from '../../shared/domain/courses/CourseName'
import { Course } from '../domain/course'
import { CourseRepository } from '../domain/course.repository'
import { CourseDto } from '../infrastructure/dtos/course.dto'

@injectable()
export class CourseCreator {
  constructor(@inject('CourseRepository') private readonly repository: CourseRepository) {}

  async run(request: CourseDto) {
    const course = new Course(
      new Uuid(request.id),
      new CourseName(request.name),
      !request.duration ? undefined : new CourseDuration(request.duration)
    )

    return this.repository.save(course)
  }
}
