import {
  PostLike,
} from './PostLike.js'
import type {
  PostLikeId,
} from './PostLikeId.js'

export abstract class PostLikeRepository {
  abstract save(user: PostLike): Promise<void>

  abstract search(id: PostLikeId): Promise<PostLike | null>
}
