import {
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/Events/DomainEvent.js'

import {
  UserDomainEvent,
} from './UserDomainEvent.js'

export type UserRegisteredDomainEventPrimitives = {
  id: string
  name: string
  email: string
  profilePicture: string
  status: string
}

export class UserRegisteredDomainEvent extends UserDomainEvent implements UserRegisteredDomainEventPrimitives {
  static override readonly EVENT_NAME: string = 'user.registered'

  readonly name: string
  readonly email: string
  readonly profilePicture: string
  readonly status: string

  constructor({
    id,
    name,
    email,
    profilePicture,
    status,
    ...event
  }: DomainEventPrimitives<UserRegisteredDomainEventPrimitives>) {
    super({
      id,
      eventName: UserRegisteredDomainEvent.EVENT_NAME,
      ...event,
    })
    this.name = name
    this.email = email
    this.profilePicture = profilePicture
    this.status = status
  }

  static override fromPrimitives(
    props: DomainEventPrimitivesWithAttributes<UserRegisteredDomainEventPrimitives>,
  ): UserRegisteredDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
        name,
        email,
        profilePicture,
        status,
      },
    } = props
    return new UserRegisteredDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
      name,
      email,
      profilePicture,
      status,
    })
  }

  override toPrimitives(): UserRegisteredDomainEventPrimitives {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      profilePicture: this.profilePicture,
      status: this.status,
    }
  }
}
