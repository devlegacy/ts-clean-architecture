import {
  PostId,
} from '../../Shared/domain/index.js'
import {
  PostDoesNotExistError,
} from '../domain/Errors/PostDoesNotExistError.js'
import {
  Post,
} from '../domain/Post.js'
import {
  PostRepository,
} from '../domain/PostRepository.js'

export class PostFinder {
  constructor(private readonly repository: PostRepository) {}

  // find
  async run(id: string): Promise<Post> {
    const post = await this.repository.search(new PostId(id))

    if (!post) {
      throw new PostDoesNotExistError(id)
    }

    return post
  }
}
