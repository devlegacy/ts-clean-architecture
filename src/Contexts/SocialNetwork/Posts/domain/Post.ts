import {
  AggregateRoot,
} from '#@/src/Contexts/Shared/domain/AggregateRoot.js'
import {
  type Clock,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  PostId,
  UserId,
} from '#@/src/Contexts/SocialNetwork/Shared/domain/index.js'

import {
  PostPublishedDomainEvent,
} from './PostPublishedDomainEvent.js'
import {
  PostContent,
  PostLatestLikes,
  PostTotalLikes,
} from './ValueObjects/index.js'

export class Post extends AggregateRoot {
  private constructor(
    public readonly id: PostId,
    public readonly userId: UserId,
    public readonly content: PostContent,
    public totalLikes: PostTotalLikes,
    public latestLikes: PostLatestLikes,
    public readonly createdAt: Date,
  ) {
    super()
  }

  static publish(id: string, userId: string, content: string, clock: Clock): Post {
    const post = new Post(
      new PostId(id),
      new UserId(userId),
      new PostContent(content),
      PostTotalLikes.init(),
      PostLatestLikes.init(),
      clock.now(),
    )

    post.record(new PostPublishedDomainEvent({
      aggregateId: post.id.value,
      id: post.id.value,
      userId: post.userId.value,
      content: post.content.value,
    }))

    return post
  }

  static override fromPrimitives(primitives: Primitives<Post>): Post {
    return new Post(
      new PostId(primitives.id),
      new UserId(primitives.userId),
      new PostContent(primitives.content),
      new PostTotalLikes(primitives.totalLikes),
      PostLatestLikes.fromPrimitives(primitives.latestLikes),
      primitives.createdAt,
    )
  }

  toPrimitives(): Primitives<Post> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      content: this.content.value,
      totalLikes: this.totalLikes.value,
      latestLikes: this.latestLikes.toPrimitives(),
      createdAt: this.createdAt,
    }
  }
}
