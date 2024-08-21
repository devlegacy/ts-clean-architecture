import type {
  Clock,
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  PostFinder,
} from '../../Posts/application/PostFinder.js'
import type {
  UserFinder,
} from '../../Users/domain/UserFinder.js'
import {
  PostLike,
} from '../domain/PostLike.js'
import {
  PostLikeRepository,
} from '../domain/PostLikeRepository.js'

export class PostLiker {
  constructor(
    private readonly postFinder: PostFinder,
    private readonly userFinder: UserFinder,
    private readonly clock: Clock,
    private readonly repository: PostLikeRepository,
    private readonly eventBus: EventBus,
  ) {}

  // like
  async run(id: string, postId: string, likerUserId: string): Promise<void> {
    await this.ensurePostExists(postId)
    await this.ensureUserExists(likerUserId)
    // await Promise.all([
    //   this.ensurePostExists(postId),
    //   this.ensureUserExists(likerUserId),
    // ])
    const postLike = PostLike.like(id, postId, likerUserId, this.clock)

    await this.repository.save(postLike)
    await this.eventBus.publish(postLike.pullDomainEvents())
  }

  private async ensurePostExists(postId: string): Promise<void> {
    await this.postFinder.run(postId)
  }

  private async ensureUserExists(userId: string): Promise<void> {
    await this.userFinder.run(userId)
  }
}
