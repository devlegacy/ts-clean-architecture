// import { jest } from '@jest/globals'
// node --test --loader=ts-paths-esm-loader/transpile-only ./tests/Contexts/User/Users/application/Register/UserRegister.test.ts
// NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest --config ./jest.config.mjs
import assert from 'node:assert/strict'
import {
  describe,
  it,
  mock,
} from 'node:test'

import {
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  UserId,
} from '#@/src/Contexts/User/Shared/domain/index.js'
import {
  UserRegister,
} from '#@/src/Contexts/User/Users/application/index.js'
import {
  User,
} from '#@/src/Contexts/User/Users/domain/index.js'
import {
  InMemoryUserRepository,
} from '#@/src/Contexts/User/Users/infrastructure/index.js'

import {
  UserMother,
} from '../../domain/index.js'

const validEmail = 'validemail@gmail.com'
const validName = 'Samuel'
const validUsername = 'jst.samuel'
const validId = UserId.random().toString()
const currentDate = new Date()
const validBirthdate = new Date(currentDate.getFullYear() - 50, currentDate.getMonth(), currentDate.getDate())

const validJobExperience = [
  {
    title: 'Job title',
    company: 'Company',
    dateRange: {
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01'),
    },
  },
]

// https://github.com/CodelyTV/value_objects-course/blob/main/03-value_objects_beyond/1-testing/3-with_all_object_mothers/tests/users/application/UserRegistrar.test.ts
describe('UserRegistrar', () => {
  it('registers a user without throwing errors when all data is valid', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')

    const repositorySave = mock.method(repository, 'save')

    const user = UserMother.create()

    await userRegistrar.run({
      // id: validId,
      id: user.id.value,
      // name: validName,
      name: user.name.value,
      // username: validUsername,
      username: user.username.value,
      // email: validEmail,
      email: user.email.value,
      // birthdate: validBirthdate,
      birthdate: user.birthdate.value,
      // jobExperiences: validJobExperience,
      jobExperiences: user.jobExperiences.toPrimitives(),
      createdAt: user.createdAt.value,
      updatedAt: user.updatedAt.value,
    })

    // expect(repositorySave).toHaveBeenCalledWith(
    //   // new User(validId, validName, validUsername, validEmail, validBirthdate, validJobExperience)
    //   new User(
    //     user.id.value,
    //     user.name.value,
    //     user.username.value,
    //     user.email.value,
    //     user.birthdate.value,
    //     user.jobExperiences.toPrimitives()
    //   )
    // )
    assert.deepStrictEqual(
      repositorySave.mock.calls[0]!.arguments[0],
      new User(
        user.id.value,
        user.name.value,
        user.username.value,
        user.email.value,
        user.birthdate.value,
        user.jobExperiences.toPrimitives(),
        user.createdAt.value,
        user.updatedAt.value,
      ),
    )
  })

  it('throws an error when registering a user with an invalid uuid', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const register = async () => {
      const invalidId = new UserId('patata').toString()
      await userRegistrar.run({
        id: invalidId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it('throws an error when registering a user with an invalid email', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const register = async () => {
      const invalidEmail = 'invalidemail'
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: invalidEmail,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it('throws an error when registering a user with an invalid email domain', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const register = async () => {
      const invalidEmailDomain = 'mail@invaliddomain.comxx'
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: invalidEmailDomain,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)

    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it('throws an error when registering a user older than 110 years', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const birthdate = new Date()
    birthdate.setFullYear(birthdate.getFullYear() - 111)

    const register = async () => {
      const invalidBirthdate = birthdate
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: invalidBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it('throws an error when registering a user younger than 18 years', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const birthdate = new Date()
    birthdate.setFullYear(birthdate.getFullYear() - 18)
    birthdate.setMonth(11)
    birthdate.setDate(31)

    const currentDate = new Date()
    // If the test runs on January 1st, adjust the birthdate to make the user still 17 years old
    if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
      birthdate.setFullYear(birthdate.getFullYear() - 1)
    }

    const register = async () => {
      const invalidBirthdate = birthdate
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: invalidBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it(`throws an error when registering a user with a job experience that has a startDate later than the current Date`, async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const currentDate = new Date()
    const invalidStartDate = new Date(currentDate.getFullYear() + 1, 0, 1)

    const register = async () => {
      const invalidJobExperience = [
        {
          ...validJobExperience[0]!,
          dateRange: {
            startDate: invalidStartDate,
            endDate: null,
          },
        },
      ]
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it(`throws an error when registering a user with a job experience with an end date that is earlier than the start date`, async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear() - 1, 0, 1)
    const endDate = new Date(currentDate.getFullYear() - 2, 0, 1)

    const register = async () => {
      const invalidJobExperience = [
        {
          ...validJobExperience[0]!,
          dateRange: {
            startDate,
            endDate,
          },
        },
      ]
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperience,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })

  it('throws an error when two job experiences overlap', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    // const repositorySave = jest.spyOn(repository, 'save')
    const repositorySave = mock.method(repository, 'save')

    const register = async () => {
      const invalidJobExperiences = [
        {
          title: 'Job title',
          company: 'Company',
          dateRange: {
            startDate: new Date('2020-01-01'),
            endDate: new Date('2022-01-01'),
          },
        },
        {
          title: 'Another Job title',
          company: 'Another Company',
          dateRange: {
            startDate: new Date('2020-05-05'),
            endDate: new Date('2022-01-01'),
          },
        },
      ]
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperiences,
      })
    }

    // await expect(register).rejects.toThrow(InvalidArgumentError)
    await assert.rejects(register, InvalidArgumentError)
    // expect(repositorySave).not.toHaveBeenCalled()
    assert.strictEqual(repositorySave.mock.calls.length, 0)
  })
})
