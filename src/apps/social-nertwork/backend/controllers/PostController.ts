import {
  Body,
  Controller,
  Post,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  DomainError,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  PostFinder,
} from '#@/src/Contexts/SocialNetwork/Posts/application/PostFinder.js'
import type {
  PostPublisher,
} from '#@/src/Contexts/SocialNetwork/Posts/application/PostPublisher.js'
import {
  PostContentIsEmptyError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/PostContentIsEmptyError.js'
import {
  PostContentTooLongError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/PostContentTooLongError.js'
import {
  PostDoesNotExistError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/PostDoesNotExistError.js'

@Controller('posts')
export class PostController {
  constructor(
    private readonly publisher: PostPublisher,
    private readonly finder: PostFinder,
  ) {}

  @Post()
  async publish(@Body() post: { id: string, userId: string, content: string }) {
    try {
      await this.publisher.run(post.id, post.userId, post.content)
      return {}
    } catch (e) {
      // exhaustive error handling
      if (e instanceof DomainError) {
        switch (e.constructor) {
          case PostContentIsEmptyError:
            // 400
            return {}
          case PostContentTooLongError:
            // 400
            return {}
        }
      }
      // internal server error!
      return {}
    }
  }

  @Post()
  async publishWithOptional(@Body() post: { id: string, userId: string, content: string }) {
    return (await this.finder.runOptional(post.id)).fold(() => {
      const n = new PostDoesNotExistError(post.id)
      // transform
      return n
    }, (post) => post)
  }
}
