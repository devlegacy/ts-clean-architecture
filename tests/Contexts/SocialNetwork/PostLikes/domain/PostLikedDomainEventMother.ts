import {
  PostLike,
  PostLikedDomainEvent,
} from '#@/src/Contexts/SocialNetwork/PostLikes/domain/index.js'

import {
  PostIdMother,
} from '../../Posts/domain/PostIdMother.js'
import {
  UserIdMother,
} from '../../Users/domain/UserIdMother.js'
import {
  PostLikeIdMother,
} from './PostLikeIdMother.js'

export class PostLikedDomainEventMother {
  static create(params?: Partial<Primitives<PostLike>>): PostLikedDomainEvent {
    const primitives: Primitives<PostLike> = {
      id: PostLikeIdMother.create().value,
      postId: PostIdMother.create().value,
      userId: UserIdMother.create().value,
      likedAt: new Date(),
      ...params,
    }

    return new PostLikedDomainEvent({
      id: primitives.id,
      postId: primitives.postId,
      userId: primitives.userId,
      aggregateId: primitives.id,
    })
  }
}
