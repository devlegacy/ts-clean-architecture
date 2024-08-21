import {
  faker,
} from '@faker-js/faker'

import {
  PostLikeId,
} from '#@/src/Contexts/SocialNetwork/PostLikes/domain/index.js'

export class PostLikeIdMother {
  static create(value?: string): PostLikeId {
    return new PostLikeId(value ?? faker.string.uuid())
  }
}
