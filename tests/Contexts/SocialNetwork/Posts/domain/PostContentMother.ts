import {
  faker,
} from '@faker-js/faker'

import {
  PostContent,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/ValueObjects/index.js'

export class PostContentMother {
  static create(value?: string): PostContent {
    return new PostContent(value ?? faker.string.alpha({
      length: {
        min: 1,
        max: 280,
      },
    }))
  }
}
