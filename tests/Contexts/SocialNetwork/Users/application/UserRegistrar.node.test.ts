import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  UserRegistrar,
} from '#@/src/Contexts/SocialNetwork/Users/application/UserRegistrar.js'
import {
  MockEventBus,
} from '#@/tests/Contexts/Shared/infrastructure/MockEventBus.js'

import {
  UserMother,
} from '../domain/UserMother.js'
import {
  UserRegisteredDomainEventMother,
} from '../domain/UserRegisteredDomainEventMother.js'
import {
  MockUserRepository,
} from '../infrastructure/MockUserRepository.js'

let repository: MockUserRepository
let eventBus: MockEventBus

let userRegistrar: UserRegistrar

beforeEach(() => {
  repository = new MockUserRepository()
  eventBus = new MockEventBus()

  userRegistrar = new UserRegistrar(repository, eventBus)
})

describe('UserRegistrar should', () => {
  it('register a valid user', async () => {
    const expectedUser = UserMother.create()
    const expectedUserPrimitives = expectedUser.toPrimitives()

    const expectedDomainEvent = UserRegisteredDomainEventMother.create(expectedUserPrimitives)

    repository.shouldSave(expectedUser)
    eventBus.shouldPublish([
      expectedDomainEvent,
    ])

    await userRegistrar.registrar(
      expectedUserPrimitives.id,
      expectedUserPrimitives.name,
      expectedUserPrimitives.email,
      expectedUserPrimitives.profilePicture,
    )
  })
})
