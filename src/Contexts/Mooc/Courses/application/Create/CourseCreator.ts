/**
 * NOTE: Always import from *📂 domain* or *📂 application* never *📂 infrastructure*
 *
 * Todas las capas de nuestra arquitectura más externas solo deberían depender de las capas más internas
 *  - (infraestructura -> application -> domain)
 *
 * Esta premisa debe garantizar:
 *  - Si cambiamos algo de infraestructura (no hay que modificar) no se afecta el comportamiento del dominio
 */

import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Course, type CourseEntityType, CourseRepository,
} from '../../domain/index.js'

// NOTE: Complejidad asumida
// NOTE: Collaborator
@UseCase()
export class CourseCreator {
  // Conventions | Convenciones -> Verb as Action [Creator]
  constructor(
    private readonly repository: CourseRepository,
    private readonly bus: EventBus,
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

  async run(request: CourseEntityType) {
    const course = Course.create(
      request.id,
      request.name,
      request.duration,
    )

    await this.repository.save(course)
    await this.bus.publish(course.pullDomainEvents())
  }
}
