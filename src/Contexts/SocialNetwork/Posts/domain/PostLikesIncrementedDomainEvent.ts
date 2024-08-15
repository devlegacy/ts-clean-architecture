import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/index.js'

export type PostLikesIncrementedDomainEventPrimitives = {
  id: string
  likes: number
}

export class PostLikesIncrementedDomainEvent extends DomainEvent implements PostLikesIncrementedDomainEventPrimitives {
  static override readonly EVENT_NAME = 'post.likes.incremented'

  readonly id: string
  readonly likes: number

  constructor({
    id,
    likes,
    ...event
  }: DomainEventPrimitives<PostLikesIncrementedDomainEventPrimitives>) {
    super({
      eventName: PostLikesIncrementedDomainEvent.EVENT_NAME,
      ...event,
    })
    this.id = id
    this.likes = likes
  }

  static override fromPrimitives(props: DomainEventPrimitivesWithAttributes<PostLikesIncrementedDomainEventPrimitives>): PostLikesIncrementedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
        likes,
      },
    } = props
    return new PostLikesIncrementedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
      likes,
    })
  }

  toPrimitives(): PostLikesIncrementedDomainEventPrimitives {
    return {
      id: this.id,
      likes: this.likes,
    }
  }
}
