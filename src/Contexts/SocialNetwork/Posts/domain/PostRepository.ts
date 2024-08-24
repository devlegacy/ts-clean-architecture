import {
  Optional,
} from '#@/src/Contexts/Shared/domain/Optional.js'

import {
  Post,
} from './Post.js'

export abstract class PostRepository {
  abstract save(post: Post): Promise<void>

  abstract search(id: Post['id']): Promise<Post | null>

  abstract searchWithOptional(id: Post['id']): Promise<Optional<Post>>
  // async searchWithOptional(_id: PostId): Promise<Optional<Post>> {
  // return Promise.resolve(null);
  // }
}
