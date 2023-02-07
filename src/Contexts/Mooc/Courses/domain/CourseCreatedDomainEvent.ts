import { DomainEvent } from '@/Contexts/Shared/domain'

type CreateCourseDomainEventAttributes = {
  readonly duration?: string
  readonly name: string
}

export class CourseCreatedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'course.created'

  readonly name: string
  readonly duration?: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    duration,
    name,
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    duration?: string
    name: string
  }) {
    super({
      aggregateId,
      eventId,
      occurredOn,
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
    })
    this.duration = duration
    this.name = name
  }

  static override fromPrimitives(params: {
    aggregateId: string
    occurredOn: Date
    eventId: string
    attributes: CreateCourseDomainEventAttributes
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new CourseCreatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      duration: attributes?.duration,
      name: attributes.name,
    })
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration } = this
    return {
      name,
      duration,
    }
  }
}
