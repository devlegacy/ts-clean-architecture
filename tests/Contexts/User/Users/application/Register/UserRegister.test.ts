import { InvalidArgumentError } from '@/Contexts/Shared/domain'
import { UserId } from '@/Contexts/User/Shared/domain'
import { UserRegister } from '@/Contexts/User/Users/application'
import { JobExperiences, User, UserBirthdate, UserEmail, UserName, UserUsername } from '@/Contexts/User/Users/domain'
import { InMemoryUserRepository } from '@/Contexts/User/Users/infrastructure'

const validEmail = new UserEmail('validemail@gmail.com')
const validName = new UserName('Samuel')
const validUsername = new UserUsername('jst.samuel')
const validId = UserId.random()
const currentDate = new Date()
const validBirthdate = new UserBirthdate(
  new Date(currentDate.getFullYear() - 50, currentDate.getMonth(), currentDate.getDate())
)
const validJobExperiencePrimitive = [
  {
    title: 'Job title',
    company: 'Company',
    dateRange: {
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01'),
    },
  },
]
const validJobExperience = JobExperiences.fromPrimitives(validJobExperiencePrimitive)

describe('UserRegistrar', () => {
  it('registers a user without throwing errors when all data is valid', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    await userRegistrar.run({
      id: validId,
      name: validName,
      username: validUsername,
      email: validEmail,
      birthdate: validBirthdate,
      jobExperiences: validJobExperience,
    })

    expect(repositorySave).toHaveBeenCalledWith(
      new User(validId, validName, validUsername, validEmail, validBirthdate, validJobExperience)
    )
  })

  it('throws an error when registering a user with an invalid uuid', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const register = async () => {
      const invalidId = new UserId('patata')
      await userRegistrar.run({
        id: invalidId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error when registering a user with an invalid email', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const register = async () => {
      const invalidEmail = new UserEmail('invalidemail')
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: invalidEmail,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error when registering a user with an invalid email domain', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const register = async () => {
      const invalidEmailDomain = new UserEmail('mail@invaliddomain.com')
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: invalidEmailDomain,
        birthdate: validBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error when registering a user older than 110 years', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const birthdate = new Date()
    birthdate.setFullYear(birthdate.getFullYear() - 111)

    const register = async () => {
      const invalidBirthdate = new UserBirthdate(birthdate)
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: invalidBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error when registering a user younger than 18 years', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

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
      const invalidBirthdate = new UserBirthdate(birthdate)
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: invalidBirthdate,
        jobExperiences: validJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it(`throws an error when registering a user with a job experience that has a startDate later than the current Date`, async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const currentDate = new Date()
    const invalidStartDate = new Date(currentDate.getFullYear() + 1, 0, 1)

    const register = async () => {
      const invalidJobExperience = JobExperiences.fromPrimitives([
        {
          ...validJobExperiencePrimitive[0],
          dateRange: {
            startDate: invalidStartDate,
            endDate: null,
          },
        },
      ])
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it(`throws an error when registering a user with a job experience with an end date that is earlier than the start date`, async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear() - 1, 0, 1)
    const endDate = new Date(currentDate.getFullYear() - 2, 0, 1)

    const register = async () => {
      const invalidJobExperience = JobExperiences.fromPrimitives([
        {
          ...validJobExperiencePrimitive[0],
          dateRange: {
            startDate,
            endDate,
          },
        },
      ])
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperience,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error when two job experiences overlap', async () => {
    const repository = new InMemoryUserRepository()
    const userRegistrar = new UserRegister(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const register = async () => {
      const invalidJobExperiences = JobExperiences.fromPrimitives([
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
      ])
      await userRegistrar.run({
        id: validId,
        name: validName,
        username: validUsername,
        email: validEmail,
        birthdate: validBirthdate,
        jobExperiences: invalidJobExperiences,
      })
    }

    await expect(register).rejects.toThrow(InvalidArgumentError)
    expect(repositorySave).not.toHaveBeenCalled()
  })
})
