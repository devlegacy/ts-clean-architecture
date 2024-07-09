import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Course,
  CourseDuration,
  CourseName,
  CourseRepository,
} from '../domain/index.js'
import type {
  CourseCreatorRequest,
} from './CourseCreatorRequest.js'

export class CourseCreator {
  constructor(
    private readonly repository: CourseRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(request: CourseCreatorRequest) {
    const course = Course.create(
      new CourseId(request.id),
      new CourseName(request.name),
      request.duration ? new CourseDuration(request.duration) : undefined,
    )
    const events = course.pullDomainEvents()

    await this.repository.save(course)
    await this.eventBus.publish(events)
  }
}
