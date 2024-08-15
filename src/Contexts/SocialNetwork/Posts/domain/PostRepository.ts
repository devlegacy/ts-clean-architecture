import {
  Post,
} from './Post.js'

export abstract class PostRepository {
  abstract save(user: Post): Promise<void>

  abstract search(id: Post['id']): Promise<Post | null>
}
