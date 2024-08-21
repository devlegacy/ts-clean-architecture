import {
  User,
} from '#@/src/Contexts/SocialNetwork/Users/domain/User.js'
import {
  UserRegisteredDomainEvent,
} from '#@/src/Contexts/SocialNetwork/Users/domain/UserRegisteredDomainEvent.js'
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

export class UserRegisteredDomainEventMother {
  static create(params?: Partial<Primitives<User>>): UserRegisteredDomainEvent {
    const primitives: Primitives<User> = {
      id: UserIdMother.create().value,
      name: UserNameMother.create().value,
      email: UserEmailMother.create().value,
      profilePicture: UserProfilePictureMother.create().value,
      status: UserStatus.Active,
      ...params,
    }

    return new UserRegisteredDomainEvent({
      id: primitives.id,
      name: primitives.name,
      email: primitives.email,
      profilePicture: primitives.profilePicture,
      status: primitives.status as string,
      aggregateId: primitives.id,
    })
  }
}
