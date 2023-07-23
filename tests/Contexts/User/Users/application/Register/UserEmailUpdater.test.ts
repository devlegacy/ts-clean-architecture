import { InvalidArgumentError } from '@/Contexts/Shared/domain'
import { UserId } from '@/Contexts/User/Shared/domain'
import { UserEmailUpdater } from '@/Contexts/User/Users/application'
import { User, UserDoesNotExistError } from '@/Contexts/User/Users/domain'
import { InMemoryUserRepository } from '@/Contexts/User/Users/infrastructure'

const validName = 'Samuel'
const validUsername = 'jst.samuel'
const validId = UserId.random().toString()
const currentDate = new Date()
const validBirthdate = new Date(currentDate.getFullYear() - 50, currentDate.getMonth(), currentDate.getDate())
describe('UserEmailUpdater', () => {
  it('registers a user without throwing errors when all data is valid', async () => {
    const repository = new InMemoryUserRepository()
    const userEmailUpdater = new UserEmailUpdater(repository)

    const oldEmail = 'oldemail@gmail.com'
    const newEmail = 'newemail@gmail.com'
    await repository.save(new User(validId, validName, validUsername, oldEmail, validBirthdate, []))

    const repositorySave = jest.spyOn(repository, 'save')

    await userEmailUpdater.run(oldEmail, newEmail)

    expect(repositorySave).toHaveBeenCalledWith(
      new User(validId, validName, validUsername, newEmail, validBirthdate, [])
    )
  })

  it('throws an error if the user does not exist', async () => {
    const repository = new InMemoryUserRepository()
    const userEmailUpdater = new UserEmailUpdater(repository)
    const repositorySave = jest.spyOn(repository, 'save')

    const oldEmail = 'oldemail@gmail.com'
    const newEmail = 'newemail@gmail.com'

    await expect(async () => await userEmailUpdater.run(oldEmail, newEmail)).rejects.toThrow(UserDoesNotExistError)
    expect(repositorySave).not.toHaveBeenCalled()
  })

  it('throws an error if the new email is invalid', async () => {
    const repository = new InMemoryUserRepository()
    const userEmailUpdater = new UserEmailUpdater(repository)

    const oldEmail = 'oldemail@gmail.com'
    const invalidNewEmail = 'newemail@invalid.com'
    repository.save(new User(validId, validName, validUsername, oldEmail, validBirthdate, []))
    const repositorySave = jest.spyOn(repository, 'save')

    await expect(async () => await userEmailUpdater.run(oldEmail, invalidNewEmail)).rejects.toThrow(
      InvalidArgumentError
    )
    expect(repositorySave).not.toHaveBeenCalled()
  })
})
