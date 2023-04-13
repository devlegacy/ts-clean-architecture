import { Course, CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'

export class CourseCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    duration,
    name,
    occurredOn,
  }: {
    aggregateId: string
    eventId?: string
    duration?: string
    name: string
    occurredOn?: Date
  }): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId,
      eventId,
      duration,
      name,
      occurredOn,
    })
  }

  static fromCourse(course: Course): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId: course.id.value,
      duration: course?.duration?.value,
      name: course.name.value,
    })
  }
}
