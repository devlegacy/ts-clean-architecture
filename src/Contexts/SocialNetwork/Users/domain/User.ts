import {
  AggregateRoot,
} from '#@/src/Contexts/Shared/domain/AggregateRoot.js'
import {
  UserId,
} from '#@/src/Contexts/SocialNetwork/Shared/domain/index.js'

import {
  UserArchivedDomainEvent,
} from './UserArchivedDomainEvent.js'
import {
  UserEmailUpdatedDomainEvent,
} from './UserEmailUpdateDomainEvent.js'
import {
  UserRegisteredDomainEvent,
} from './UserRegisteedDomainEvent.js'
import {
  UserEmail,
  UserName,
  UserProfilePicture,
  UserStatus,
} from './ValueObjects/index.js'

export class User extends AggregateRoot {
  readonly id: UserId
  readonly name: UserName
  email: UserEmail
  readonly profilePicture: UserProfilePicture
  status: UserStatus

  private constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    profilePicture: UserProfilePicture,
    status: UserStatus,
  ) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.profilePicture = profilePicture
    this.status = status
  }

  static create(id: string, name: string, email: string, profilePicture: string): User {
    const defaultUserStatus = UserStatus.Active

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserProfilePicture(profilePicture),
      defaultUserStatus,
    )

    user.record(new UserRegisteredDomainEvent({
      id: user.id.value,
      name: user.name.value,
      email: user.name.value,
      profilePicture: user.profilePicture.value,
      status: user.status,
      aggregateId: user.id.value,
    }))

    return user
  }

  static override fromPrimitives(primitives: Primitives<User>): User {
    return new User(
      new UserId(primitives.id),
      new UserName(primitives.name),
      new UserEmail(primitives.email),
      new UserProfilePicture(primitives.profilePicture),
      primitives.status,
    )
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      profilePicture: this.profilePicture.value,
      status: this.status,
    }
  }

  updateEmail(email: string): void {
    this.email = new UserEmail(email)

    this.record(new UserEmailUpdatedDomainEvent({
      id: this.id.value,
      email: this.email.value,
      aggregateId: this.id.value,
    }))
  }

  archive(): void {
    this.status = UserStatus.Archived

    this.record(new UserArchivedDomainEvent({
      id: this.id.value,
      aggregateId: this.id.value,
    }))
  }
}
