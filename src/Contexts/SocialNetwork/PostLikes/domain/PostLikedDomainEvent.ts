import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/index.js'

export type PostLikedDomainEventPrimitives = {
  id: string
  postId: string
  userId: string
}

export class PostLikedDomainEvent extends DomainEvent implements PostLikedDomainEventPrimitives {
  static override readonly EVENT_NAME = 'post.liked'

  readonly id: string
  readonly postId: string
  readonly userId: string

  constructor({
    id,
    postId,
    userId,
    ...event
  }: DomainEventPrimitives<PostLikedDomainEventPrimitives>) {
    super({
      eventName: PostLikedDomainEvent.EVENT_NAME,
      ...event,
    })
    this.id = id
    this.postId = postId
    this.userId = userId
  }

  static override fromPrimitives(props: DomainEventPrimitivesWithAttributes<PostLikedDomainEventPrimitives>): PostLikedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
        postId,
        userId,
      },
    } = props

    return new PostLikedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
      postId,
      userId,
    })
  }

  toPrimitives(): PostLikedDomainEventPrimitives {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
