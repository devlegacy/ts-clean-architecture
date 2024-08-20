import {
  PostLikesIncrementedDomainEvent,
  type PostLikesIncrementedDomainEventPrimitives,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/PostLikesIncrementedDomainEvent.js'

import {
  PostIdMother,
} from './PostIdMother.js'
import {
  PostLikesMother,
} from './PostLikesMother.js'

export class PostLikesIncrementedDomainEventMother {
  static create(
    params?: Partial<PostLikesIncrementedDomainEventPrimitives>,
  ): PostLikesIncrementedDomainEvent {
    const primitives: PostLikesIncrementedDomainEventPrimitives = {
      id: PostIdMother.create().value,
      likes: PostLikesMother.create().value,
      ...params,
    }

    return new PostLikesIncrementedDomainEvent({
      id: primitives.id,
      likes: primitives.likes,
      aggregateId: primitives.id,
    })
  }
}
