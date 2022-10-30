/**
 * NOTE: Always import of domain never *Infrastructure*
 *
 * Todas las capas de nuestra arquitectura más externas solo deberían depender de las capas más internas
 *  - (infraestructura -> application -> domain)
 *
 * Esta premisa debe garantizar:
 *  - Si cambiamos algo de infraestructura (no hay que modificar) no se afecta el comportamiento del dominio
 */

import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection'
import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../../Shared/domain'
import { Course, CourseDuration, CourseName, CourseRepository } from '../../domain'

// NOTE: Complejidad asumida
@injectable()
export class CourseCreator {
  constructor(
    @inject(TYPES.CourseRepository) private readonly repository: CourseRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  async run(request: { id: CourseId; name: CourseName; duration?: CourseDuration }) {
    const course = Course.create(request.id, request.name, !request.duration ? undefined : request.duration)

    await this.repository.save(course)
    await this.eventBus.publish(course.pullDomainEvents())
  }
}
