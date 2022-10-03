import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { User, UserRepository, UserUsername } from '@/Contexts/User/Users/domain'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async findByUserName(username: UserUsername): Promise<Nullable<User>> {
    const idx = this.users.findIndex((user) => user.username.value === username.value)

    return this.users[idx]
  }

  async findById(userId: string): Promise<Nullable<User>> {
    const idx = this.users.findIndex(({ id }) => id.value === userId)

    return this.users[idx]
  }

  async softDelete(userId: string): Promise<void> {
    const users = this.users.filter(({ id }) => id.value !== userId)
    this.users = users
  }

  async getAll(): Promise<User[]> {
    return this.users
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
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

  async delete(userId: string): Promise<void> {
    const users = this.users.filter(({ id }) => id.value !== userId)
    this.users = users
  }

  async getById(userId: string): Promise<Nullable<User>> {
    const user = this.users.find((user) => user.id.value === userId)
    return user || null
  }
}
