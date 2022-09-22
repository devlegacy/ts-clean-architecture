import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { User } from '@/Contexts/User/Users/domain/User'
import { UserRepository } from '@/Contexts/User/Users/domain/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async getAll(): Promise<User[]> {
    return this.users
  }

  async save(user: User): Promise<User> {
    this.users.push(user)

    return user
  }

  async getByUserName(username: string): Promise<Nullable<User>> {
    const user = this.users.find((user: User) => user.username.value === username)
    if (!user) return null
    return user
  }

  async update(user: User): Promise<User> {
    const users = this.users.filter(({ id }) => id.value !== user.id.value)
    users.push(user)
    this.users = users

    return user
  }

  async delete(user: User): Promise<void> {
    const users = this.users.filter(({ id }) => id.value !== user.id.value)
    this.users = users
  }

  async getById(id: string): Promise<Nullable<User>> {
    const user = this.users.find((user) => user.id.value === id)
    return user || null
  }
}
