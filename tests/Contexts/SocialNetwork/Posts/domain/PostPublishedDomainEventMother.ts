import {
  Post,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Post.js'
import {
  PostPublishedDomainEvent,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/PostPublishedDomainEvent.js'

import {
  UserIdMother,
} from '../../Users/domain/UserIdMother.js'
import {
  PostContentMother,
} from './PostContentMother.js'
import {
  PostIdMother,
} from './PostIdMother.js'
import {
  PostLatestLikesMother,
} from './PostLatestLikesMother.js'
import {
  PostLikesMother,
} from './PostLikesMother.js'

export class PostPublishedDomainEventMother {
  static create(params?: Partial<Primitives<Post>>): PostPublishedDomainEvent {
    const primitives: Primitives<Post> = {
      id: PostIdMother.create().value,
      userId: UserIdMother.create().value,
      content: PostContentMother.create().value,
      totalLikes: PostLikesMother.create().value,
      latestLikes: PostLatestLikesMother.empty().toPrimitives(),
      createdAt: new Date(),
      ...params,
    }

    return new PostPublishedDomainEvent({
      id: primitives.id,
      userId: primitives.userId,
      content: primitives.content,
      aggregateId: primitives.id,
    })
  }
}
