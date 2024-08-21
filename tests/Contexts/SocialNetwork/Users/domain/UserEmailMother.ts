import {
  faker,
} from '@faker-js/faker'

import {
  UserEmail,
} from '#@/src/Contexts/SocialNetwork/Users/domain/ValueObjects/UserEmail.js'

export class UserEmailMother {
  static create(value?: string): UserEmail {
    return new UserEmail(value ?? faker.internet.email())
  }
}
