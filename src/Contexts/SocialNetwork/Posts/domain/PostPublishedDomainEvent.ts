import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/index.js'

export type PostPublishedDomainEventPrimitives = {
  id: string
  userId: string
  content: string
}

export class PostPublishedDomainEvent extends DomainEvent implements PostPublishedDomainEventPrimitives {
  static override readonly EVENT_NAME = 'post.published'

  readonly id: string
  readonly userId: string
  readonly content: string

  constructor({
    id,
    userId,
    content,
    ...event
  }: DomainEventPrimitives<PostPublishedDomainEventPrimitives>) {
    super({
      eventName: PostPublishedDomainEvent.EVENT_NAME,
      ...event,
    })
    this.id = id
    this.userId = userId
    this.content = content
  }

  static override fromPrimitives(props: DomainEventPrimitivesWithAttributes<PostPublishedDomainEventPrimitives>): PostPublishedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
        userId,
        content,
      },
    } = props
    return new PostPublishedDomainEvent(
      {
        eventId,
        occurredOn,
        aggregateId,
        id,
        userId,
        content,
      },
    )
  }

  toPrimitives(): PostPublishedDomainEventPrimitives {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
    }
  }
}
