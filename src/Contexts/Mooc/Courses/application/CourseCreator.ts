import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { EventBus, Uuid } from '@/Contexts/Shared/domain'

import { Course, CourseDuration, CourseName, CourseRepository } from '../domain'

@injectable()
export class CourseCreator {
  constructor(
    @inject(TYPES.CourseRepository) private readonly repository: CourseRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  async run(request: any) {
    const course = Course.create(
      new Uuid(request.id),
      new CourseName(request.name),
      request.duration ? new CourseDuration(request.duration) : undefined
    )

    await this.repository.save(course)
    await this.eventBus.publish(course.pullDomainEvents())
  }
}
