import {
  User,
} from '#@/src/Contexts/SocialNetwork/Users/domain/User.js'
import {
  UserStatus,
} from '#@/src/Contexts/SocialNetwork/Users/domain/ValueObjects/UserStatus.js'

import {
  UserEmailMother,
} from './UserEmailMother.js'
import {
  UserIdMother,
} from './UserIdMother.js'
import {
  UserNameMother,
} from './UserNameMother.js'
import {
  UserProfilePictureMother,
} from './UserProfilePictureMother.js'

export class UserMother {
  static create(params?: Partial<Primitives<User>>): User {
    const primitives: Primitives<User> = {
      id: UserIdMother.create().value,
      name: UserNameMother.create().value,
      email: UserEmailMother.create().value,
      profilePicture: UserProfilePictureMother.create().value,
      status: UserStatus.Active,
      ...params,
    }

    return User.fromPrimitives(primitives)
  }
}
