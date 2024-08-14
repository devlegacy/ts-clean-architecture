import {
  User, UserEmail, UserRepository, UserUsername,
} from '#@/src/Contexts/User/Users/domain/index.js'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async searchAll(): Promise<User[]> {
    return this.users
  }

  async findByUsername(username: UserUsername): Promise<Nullable<User>> {
    const idx = this.users.findIndex((user) => user.username.value === username.value)

    return this.users[+idx] || null
  }

  async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    const idx = this.users.findIndex((user) => user.email.value === email.value)

    return this.users[+idx] || null
  }

  async searchById(id: User['id']): Promise<Nullable<User>> {
    const idx = this.users.findIndex((user) => user.id.equals(id))

    return this.users[+idx] || null
  }

  async softDelete(userId: string): Promise<void> {
    const users = this.users.filter(({
      id,
    }) => id.value !== userId)
    this.users = users
  }

  async search(..._data: any): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async getAll(): Promise<User[]> {
    return this.users
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async update(user: User): Promise<void> {
    const users = this.users.filter(({
      id,
    }) => id.value !== user.id.value)
    users.push(user)
    this.users = users

    // return user
  }

  async remove(userId: string): Promise<void> {
    const users = this.users.filter(({
      id,
    }) => id.value !== userId)
    this.users = users
  }

  async getById(userId: string): Promise<Nullable<User>> {
    const user = this.users.find((user) => user.id.value === userId)
    return user || null
  }
}
