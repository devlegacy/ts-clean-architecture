import {
  faker,
} from '@faker-js/faker'

import {
  UserProfilePicture,
} from '#@/src/Contexts/SocialNetwork/Users/domain/ValueObjects/UserProfilePicture.js'

export class UserProfilePictureMother {
  static create(value?: string): UserProfilePicture {
    return new UserProfilePicture(value ?? faker.image.url())
  }
}
