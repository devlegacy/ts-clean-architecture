import {
  faker,
} from '@faker-js/faker'

import {
  PostTotalLikes,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/ValueObjects/index.js'

export class PostLikesMother {
  static create(value?: number): PostTotalLikes {
    return new PostTotalLikes(value ?? faker.number.int({
      min: 0,
      max: 10000000,
    }))
  }
}
