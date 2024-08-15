import type {
  Clock,
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  PostLike,
} from '../domain/PostLike.js'
import {
  PostLikeRepository,
} from '../domain/PostLikeRepository.js'

export class PostLiker {
  constructor(
    private readonly clock: Clock,
    private readonly repository: PostLikeRepository,
    private readonly eventBus: EventBus,
  ) {}

  // like
  async run(id: string, postId: string, userId: string): Promise<void> {
    const postLike = PostLike.like(id, postId, userId, this.clock)

    await this.repository.save(postLike)
    await this.eventBus.publish(postLike.pullDomainEvents())
  }
}
