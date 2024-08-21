import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import type {
  Criteria,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  User,
} from '#@/src/Contexts/SocialNetwork/Users/domain/User.js'
import {
  UserRepository,
} from '#@/src/Contexts/SocialNetwork/Users/domain/UserRepository.js'

export class MockUserRepository implements UserRepository {
  private readonly mockSave: Mock<typeof UserRepository.prototype.save> = mock.fn()
  private readonly mockSearch: Mock<typeof UserRepository.prototype.search> = mock.fn()
  private readonly mockMatching: Mock<typeof UserRepository.prototype.matching> = mock.fn()

  async save(user: User): Promise<void> {
    // expect(this.mockSave).toHaveBeenCalledWith(user.toPrimitives())
    assert.deepEqual(this.mockSave.mock.calls[0]?.arguments?.at(0)?.toPrimitives(), user.toPrimitives())

    return Promise.resolve()
  }

  async search(id: User['id']): Promise<User | null> {
    // expect(this.mockSearch).toHaveBeenCalledWith(id)
    assert.deepEqual(this.mockSearch.mock.calls[0]?.arguments?.at(0), id)

    return this.mockSearch(id) as Promise<User | null>
  }

  async matching(criteria: Criteria): Promise<User[]> {
    // expect(this.mockMatching).toHaveBeenCalledWith(criteria)
    assert.deepEqual(this.mockMatching.mock.calls[0]?.arguments?.at(0), criteria)
    return this.mockMatching(criteria)
  }

  shouldSave(user: User): void {
    this.mockSave(user)
  }

  shouldMatch(criteria: Criteria, users: User[]): void {
    this.mockMatching(criteria)
    // this.mockMatching.mockReturnValueOnce(users)
    this.mockMatching.mock.mockImplementationOnce(() => users as unknown as Promise<User[]>)
  }

  shouldSearch(user: User): void {
    this.mockSearch(user.id)
    // this.mockSearch.mockReturnValueOnce(user)
    this.mockSearch.mock.mockImplementationOnce(() => user as unknown as Promise<User | null>)
  }

  shouldSearchAndReturnNull(id: User['id']): void {
    this.mockSearch(id)
    // this.mockSearch.mockReturnValueOnce(null)
    this.mockSearch.mock.mockImplementationOnce(() => null as unknown as Promise<User | null>)
  }
}
