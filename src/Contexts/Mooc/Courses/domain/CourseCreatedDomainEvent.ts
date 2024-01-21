import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '@/Contexts/Shared/domain/index.js'

interface CreateCourseDomainEventAttributes {
  readonly name: string // should be readonly
  readonly duration?: string // should be readonly
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
  }: // }: Omit<Primitives<CourseCreatedDomainEvent>, 'eventName'>) {
  DomainEventPrimitives<CreateCourseDomainEventAttributes>) {
    super({
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
      // eventId,
      // occurredOn,
      // aggregateId,
      ...event,
    })
    this.duration = duration
    this.name = name
  }

  static override fromPrimitives(
    props: DomainEventPrimitivesWithAttributes<CourseCreatedDomainEvent>,
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
    const primitives = {
      name: this.name,
      duration: this.duration,
    }
    return primitives
  }
}
