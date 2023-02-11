import { DomainEvent, DomainEventPrimitives, DomainEventPrimitivesWithAttributes } from '@/Contexts/Shared/domain'

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
  }: DomainEventPrimitives<CreateCourseDomainEventAttributes>) {
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

  static override fromPrimitives(
    props: DomainEventPrimitivesWithAttributes<CourseCreatedDomainEvent>
  ): CourseCreatedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: { name, duration },
    } = props

    const event = new CourseCreatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      name,
      duration,
    })
    return event
  }

  // toPrimitives(): CreateCourseDomainEventAttributes {
  toPrimitives() {
    const { name, duration } = this
    return {
      name,
      duration,
    }
  }
}
