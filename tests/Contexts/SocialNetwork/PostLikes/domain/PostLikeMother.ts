import {
  PostLike,
} from '#@/src/Contexts/SocialNetwork/PostLikes/domain/index.js'

import {
  PostIdMother,
} from '../../Posts/domain/PostIdMother.js'
import {
  UserIdMother,
} from '../../Users/domain/UserIdMother.js'
import {
  PostLikeIdMother,
} from './PostLikeIdMother.js'

export class PostLikeMother {
  static create(params?: Partial<Primitives<PostLike>>): PostLike {
    const primitives: Primitives<PostLike> = {
      id: PostLikeIdMother.create().value,
      postId: PostIdMother.create().value,
      userId: UserIdMother.create().value,
      likedAt: new Date(),
      ...params,
    }

    return PostLike.fromPrimitives(primitives)
  }
}
