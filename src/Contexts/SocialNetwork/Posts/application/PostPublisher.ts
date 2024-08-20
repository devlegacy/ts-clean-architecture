import {
  type Clock,
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Post,
} from '../domain/Post.js'
import {
  PostRepository,
} from '../domain/PostRepository.js'

export class PostPublisher {
  constructor(
    private readonly clock: Clock,
    private readonly repository: PostRepository,
    private readonly eventBus: EventBus,
  ) {}

  // publish
  async run(id: string, userId: string, content: string): Promise<void> {
    const post = Post.publish(id, userId, content, this.clock)

    await this.repository.save(post)
    await this.eventBus.publish(post.pullDomainEvents())
  }
}
