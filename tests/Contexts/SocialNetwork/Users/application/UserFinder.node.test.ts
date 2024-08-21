import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  UserFinder,
} from '#@/src/Contexts/SocialNetwork/Users/application/UserFinder.js'
import {
  UserDoesNotExistError,
} from '#@/src/Contexts/SocialNetwork/Users/domain/Errors/UserDoesNotExistError.js'

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
let finder: UserFinder

beforeEach(() => {
  repository = new MockUserRepository()
  finder = new UserFinder(repository)
})

describe('UserFinder should', () => {
//   const repository = new MockUserRepository()
//   const finder = new UserFinder(repository)

  it('throw an error finding a non existing user', async () => {
    const userId = UserIdMother.create()

    const expectedError = new UserDoesNotExistError(userId.value)

    repository.shouldSearchAndReturnNull(userId)

    // await expect(finder.find(userId.value)).rejects.toThrow(expectedError)
    await assert.rejects(finder.run(userId.value), expectedError)
  })

  it('find an existing user', async () => {
    const existingUser = UserMother.create()

    repository.shouldSearch(existingUser)

    // expect(await finder.find(existingUser.id.value)).toEqual(existingUser.toPrimitives())
    assert.deepEqual((await finder.run(existingUser.id.value))?.toPrimitives(), existingUser.toPrimitives())
  })
})
