import { DomainEvent } from '@/Contexts/Shared/domain'

type CreateCourseDomainEventAttributes = {
  readonly duration?: string
  readonly name: string
}

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created'

  readonly duration?: string
  readonly name: string

  constructor({
    aggregateId,
    duration,
    eventId,
    name,
    occurredOn
  }: {
    aggregateId: string
    duration?: string
    eventId?: string
    name: string
    occurredOn?: Date
  }) {
    super({
      aggregateId,
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn
    })
    this.duration = duration
    this.name = name
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: CreateCourseDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new CourseCreatedDomainEvent({
      aggregateId,
      duration: attributes?.duration,
      name: attributes.name,
      eventId,
      occurredOn
    })
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration } = this
    return {
      name,
      duration
    }
  }
}
