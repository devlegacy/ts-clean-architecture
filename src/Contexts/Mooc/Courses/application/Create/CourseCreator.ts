/**
 * NOTE: Always import from *📂 domain* or *📂 application* never *📂 infrastructure*
 *
 * Todas las capas de nuestra arquitectura más externas solo deberían depender de las capas más internas
 *  - (infraestructura -> application -> domain)
 *
 * Esta premisa debe garantizar:
 *  - Si cambiamos algo de infraestructura (no hay que modificar) no se afecta el comportamiento del dominio
 */

import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { Course, CourseEntityDto, CourseRepository } from '../../domain'

// NOTE: Complejidad asumida
@injectable()
export class CourseCreator {
  constructor(
    @inject(TYPES.CourseRepository) private readonly repository: CourseRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  // async run(request: CoursePrimitiveProps) {
  //   const course = Course.create(
  //     new CourseId(request.id),
  //     new CourseName(request.name),
  //     request.duration ? new CourseDuration(request.duration) : undefined
  //   )

  //   await this.repository.save(course)
  //   await this.eventBus.publish(course.pullDomainEvents())
  // }

  async run(request: CourseEntityDto) {
    const course = Course.create(request.id, request.name, request.duration ?? request.duration)

    await this.repository.save(course)
    await this.eventBus.publish(course.pullDomainEvents())
  }
}
