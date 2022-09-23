/**
 * Note: Always import of domain never *Infrastructure*
 *
 * Todas las capas de nuestra arquitectura más externas solo deberían depender de las capas más internas
 *  - (infraestructura -> application -> domain)
 *
 * Esta premisa debe garantizar:
 *  - Si cambiamos algo de infraestructura (no hay que modificar) no se afecta el comportamiento del dominio
 */

import { inject, singleton } from 'tsyringe'

import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'

import { Course } from '../domain/Course'
import { CourseRepository } from '../domain/CourseRepository'
import { CourseDto } from '../infrastructure/dtos/CourseDto'

@singleton()
export class CourseCreator {
  constructor(@inject(TYPES.CourseRepository) private readonly courseRepository: CourseRepository) {}

  async run(request: CourseDto) {
    const course = Course.fromPrimitives(request)

    return this.courseRepository.save(course)
  }
}
