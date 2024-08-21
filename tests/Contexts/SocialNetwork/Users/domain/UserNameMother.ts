import {
  faker,
} from '@faker-js/faker'

import {
  UserName,
} from '#@/src/Contexts/SocialNetwork/Users/domain/ValueObjects/UserName.js'

export class UserNameMother {
  static create(value?: string): UserName {
    return new UserName(value ?? faker.person.firstName())
  }
}
