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

// NOTE: Complejidad asumida
import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'

import { Course, CourseRepository } from '../domain'
import { CourseCreatorRequest } from './CourseCreatorRequest'

@injectable()
export class CourseCreator {
  constructor(@inject(TYPES.CourseRepository) private readonly courseRepository: CourseRepository) {}

  async run(request: CourseCreatorRequest) {
    const course = Course.fromPrimitives(request)

    return this.courseRepository.save(course)
  }
}
