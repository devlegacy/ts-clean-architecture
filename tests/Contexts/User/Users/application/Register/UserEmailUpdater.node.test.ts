// NODE_OPTIONS=--experimental-vm-modules npx jest --config=./jest.config.cjs ./tests/Contexts/User/Users/application/Register/UserEmailUpdater.test.ts

// node --test --loader=ts-paths-esm-loader/transpile-only ./tests/Contexts/User/Users/application/Register/UserEmailUpdater.test.ts
import assert from 'node:assert/strict'
import {
  describe, it, mock,
} from 'node:test'

import {
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  UserId,
} from '#@/src/Contexts/User/Shared/domain/index.js'
import {
  UserEmailUpdater,
} from '#@/src/Contexts/User/Users/application/index.js'
import {
  User, UserDoesNotExistError,
} from '#@/src/Contexts/User/Users/domain/index.js'
import {
  InMemoryUserRepository,
} from '#@/src/Contexts/User/Users/infrastructure/index.js'

const validName = 'Samuel'
const validUsername = 'jstsamuel'
const validId = UserId.random().toString()
const currentDate = new Date()
const validBirthdate = new Date(currentDate.getFullYear() - 50, currentDate.getMonth(), currentDate.getDate())

describe('UserEmailUpdater', () => {
  it('registers a user without throwing errors when all data is valid', async () => {
    const timestamp = new Date()
    const repository = new InMemoryUserRepository()
    // const repositorySave = mock.method(repository, 'save') // ❌ la ubicación de este mock es importante, debe estar antes de la instancia del UserEmailUpdater
    const userEmailUpdater = new UserEmailUpdater(repository)

    const oldEmail = 'oldemail@gmail.com'
    const newEmail = 'newemail@gmail.com'
    await repository.save(
      new User(validId, validName, validUsername, oldEmail, validBirthdate, [], timestamp, timestamp),
    )

    // const repositorySave = mock.fn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')
    await userEmailUpdater.run(oldEmail, newEmail)
    // console.log(repositorySave.mock)
    // console.log(repositorySave.mock.calls)
    // console.log(repositorySave.mock.calls[0])
    // console.log(repositorySave.mock.calls[0]!.arguments[0])
    // console.log(repositorySave.mock.calls[0][0])
    // console.log(repositorySave.mock.calls.length)

    // expect(repositorySave).toHaveBeenCalledWith(
    //   new User(validId, validName, validUsername, newEmail, validBirthdate, [])
    // )

    // assert.equal(true, true)
    assert.equal(repositorySave.mock.calls.length, 1)
    assert.deepEqual(
      repositorySave.mock.calls[0]!.arguments[0],
      new User(validId, validName, validUsername, newEmail, validBirthdate, [], timestamp, timestamp),
    )
  })

  it('throws an error if the user does not exist', async () => {
    const repository = new InMemoryUserRepository()
    const userEmailUpdater = new UserEmailUpdater(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const oldEmail = 'oldemail@gmail.com'
    const newEmail = 'newemail@gmail.com'

    // await expect(async () => await userEmailUpdater.run(oldEmail, newEmail)).rejects.toThrow(UserDoesNotExistError)
    await assert.rejects(async () => await userEmailUpdater.run(oldEmail, newEmail), UserDoesNotExistError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.equal(repositorySave.mock.calls.length, 0) // .not.toHaveBeenCalled()
  })

  it('throws an error if the new email is invalid', async () => {
    const repository = new InMemoryUserRepository()
    const userEmailUpdater = new UserEmailUpdater(repository)

    const oldEmail = 'oldemail@gmail.com'
    const invalidNewEmail = 'newemail@invalid.comxx'
    await repository.save(new User(validId, validName, validUsername, oldEmail, validBirthdate, []))
    const repositorySave = mock.method(repository, 'save')

    // repositorySave.mock.resetCalls() // if a call save with the repository directly.
    // const repositorySave = jest.spyOn(repository, 'save')

    // await expect(async () => await userEmailUpdater.run(oldEmail, invalidNewEmail)).rejects.toThrow(
    //   InvalidArgumentError
    // )
    await assert.rejects(async () => await userEmailUpdater.run(oldEmail, invalidNewEmail), InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.equal(repositorySave.mock.calls.length, 0) // Once because the user was saved before directly with the repository
  })
})
