import {
  AggregateRoot,
} from '#@/src/Contexts/Shared/domain/AggregateRoot.js'
import type {
  Clock,
} from '#@/src/Contexts/Shared/domain/Clock.js'

import {
  PostId,
  UserId,
} from '../../Shared/domain/index.js'
import {
  PostLikedDomainEvent,
} from './PostLikedDomainEvent.js'
import {
  PostLikeId,
} from './PostLikeId.js'

export class PostLike extends AggregateRoot {
  private constructor(
    public readonly id: PostLikeId,
    public readonly postId: PostId,
    public readonly userId: UserId,
    public readonly likedAt: Date,
  ) {
    super()
  }

  static like(id: string, postId: string, userId: string, clock: Clock): PostLike {
    const post = new PostLike(
      new PostLikeId(id),
      new PostId(postId),
      new UserId(userId),
      clock.now(),
    )

    post.record(new PostLikedDomainEvent({
      id: post.id.value,
      postId: post.postId.value,
      userId: post.userId.value,
      aggregateId: post.id.value,
    }))

    return post
  }

  static override fromPrimitives(primitives: Primitives<PostLike>): PostLike {
    return new PostLike(
      new PostLikeId(primitives.id),
      new PostId(primitives.postId),
      new UserId(primitives.userId),
      primitives.likedAt,
    )
  }

  toPrimitives(): Primitives<PostLike> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      postId: this.postId.value,
      likedAt: this.likedAt,
    }
  }
}
