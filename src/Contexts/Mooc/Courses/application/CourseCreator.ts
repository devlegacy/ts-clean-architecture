import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { Course, CourseDuration, CourseName, CourseRepository } from '../domain'
import { CourseCreatorRequest } from './CourseCreatorRequest'

export class CourseCreator {
  constructor(private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

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
