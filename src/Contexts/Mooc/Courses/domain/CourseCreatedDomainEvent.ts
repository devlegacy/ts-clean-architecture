import {
  DomainEvent,
  DomainEventPrimitivesWithAttributes,
  InstanceDomainEventPrimitives,
} from '@/Contexts/Shared/domain'

interface CreateCourseDomainEventAttributes {
  name: string // should be readonly
  duration?: string // should be readonly
}

export class CourseCreatedDomainEvent extends DomainEvent implements CreateCourseDomainEventAttributes {
  static override readonly EVENT_NAME = 'course.created'

  readonly name: string
  readonly duration?: string

  constructor({
    // eventId,
    // occurredOn,
    // aggregateId,
    duration,
    name,
    ...event
  }: InstanceDomainEventPrimitives<CreateCourseDomainEventAttributes>) {
    const eventName = CourseCreatedDomainEvent.EVENT_NAME
    super({
      eventName,
      // eventId,
      // occurredOn,
      // aggregateId,
      ...event,
    })
    this.duration = duration
    this.name = name
  }

  static override fromPrimitives({
    eventId,
    occurredOn,
    aggregateId,
    attributes: { name, duration },
  }: DomainEventPrimitivesWithAttributes<CreateCourseDomainEventAttributes>): CourseCreatedDomainEvent {
    const event = new CourseCreatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      name,
      duration,
    })
    return event
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration } = this
    return {
      name,
      duration,
    }
  }
}
