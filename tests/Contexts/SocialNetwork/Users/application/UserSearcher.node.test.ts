import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  UserSearcher,
} from '#@/src/Contexts/SocialNetwork/Users/application/UserSearcher.js'

import {
  UserIdMother,
} from '../domain/UserIdMother.js'
import {
  UserMother,
} from '../domain/UserMother.js'
import {
  MockUserRepository,
} from '../infrastructure/MockUserRepository.js'

let repository: MockUserRepository
let userSearcher: UserSearcher

beforeEach(() => {
  repository = new MockUserRepository()
  userSearcher = new UserSearcher(repository)
})

describe('UserSearcher should', () => {
  it('return null searching a non existing user', async () => {
    const userId = UserIdMother.create()

    repository.shouldSearchAndReturnNull(userId)

    // expect(await userSearcher.search(userId.value)).toBeNull()
    assert.strictEqual(await userSearcher.search(userId.value), null)
  })

  it('search an existing user', async () => {
    const existingUser = UserMother.create()

    repository.shouldSearch(existingUser)

    // expect(await userSearcher.search(existingUser.id.value)).toEqual(existingUser.toPrimitives())
    assert.deepEqual(await userSearcher.search(existingUser.id.value), existingUser.toPrimitives())
  })
})
