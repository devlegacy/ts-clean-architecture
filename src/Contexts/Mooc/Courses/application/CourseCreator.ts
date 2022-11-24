import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { Course, CourseDuration, CourseName, CourseRepository } from '../domain'
import { CourseCreatorRequest } from './CourseCreatorRequest'

@injectable()
export class CourseCreator {
  constructor(
    @inject(TYPES.CourseRepository) private readonly repository: CourseRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  async run(request: CourseCreatorRequest) {
    const course = Course.create(
      new CourseId(request.id),
      new CourseName(request.name),
      request.duration ? new CourseDuration(request.duration) : undefined
    )

    await this.repository.save(course)
    await this.eventBus.publish(course.pullDomainEvents())
  }
}
