import { Collection, Db } from 'mongodb'

import { Nullable } from '@/Contexts/Shared/domain/Nullable'

import { User, UserRepository } from '../../domain'

export class MongoUserRepository implements UserRepository {
  // private readonly user: Collection<User>
  private readonly user: Collection

  constructor(private readonly db: Db) {
    this.user = this.db.collection('users')
  }

  async getAll(): Promise<User[]> {
    const users = await this.user.find().toArray()
    return users.map((user) =>
      User.fromPrimitives({
        id: user.id,
        name: user?.name ?? '',
        username: user?.username ?? '',
        age: user?.age
      })
    )
  }

  async save(userDto: User): Promise<User> {
    const user = await this.user.insertOne(userDto.toPrimitives())
    if (user.insertedId) {
      const userFromDatabase = await this.user.findOne({ _id: user.insertedId })
      return userFromDatabase
        ? User.fromPrimitives({
            id: userFromDatabase?.id,
            name: userFromDatabase?.name ?? '',
            username: userFromDatabase?.username ?? '',
            age: userFromDatabase?.age
          })
        : userDto
    }
    return userDto
  }

  async getByUserName(username: string): Promise<Nullable<User>> {
    const user = await this.user.findOne({ username })
    return user
      ? User.fromPrimitives({
          id: user?.id,
          name: user?.name ?? '',
          username: user?.username ?? '',
          age: user?.age
        })
      : null
  }

  async update(userDto: User): Promise<User> {
    const { id, ...data } = userDto.toPrimitives()
    const user = await this.user.updateOne({ id }, { $set: data }, { upsert: true })

    if (user.modifiedCount) {
      const userFromDatabase = await this.user.findOne({ id })
      return userFromDatabase
        ? User.fromPrimitives({
            id: userFromDatabase?.id,
            name: userFromDatabase?.name ?? '',
            username: userFromDatabase?.username ?? '',
            age: userFromDatabase?.age
          })
        : userDto
    }

    return userDto
  }

  async delete(user: User): Promise<void> {
    this.user.deleteOne({ id: user.id.value })
  }

  async getById(id: string): Promise<Nullable<User>> {
    const user = await this.user.findOne({ id })
    return user
      ? User.fromPrimitives({
          id: user?.id,
          name: user?.name ?? '',
          username: user?.username ?? '',
          age: user?.age
        })
      : null
  }
}
