import { EntitySchema, wrap } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

import { Nullable } from '@/Contexts/Shared/domain'
import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/persistence'

import { User, UserRepository } from '../../domain'
import { UserEntity } from './mikroorm/mongo/UserEntity'

export class MongoUserRepository extends MikroOrmMongoRepository<User> implements UserRepository {
  async getAll(): Promise<User[]> {
    const repository = await this.repository()

    const users = await repository.findAll({
      orderBy: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        _id: -1
      }
    })

    return users
  }
  // async findBy(): Promise<User[]> {
  //   const users = await this.user.find().toArray()
  //   return users.map((user) =>
  //     User.fromPrimitives({
  //       id: user.id,
  //       name: user?.name ?? '',
  //       username: user?.username ?? '',
  //       age: user?.age
  //     })
  //   )

  // return []
  // }

  async save(user: User): Promise<void> {
    return this.persist(user)
  }

  async findById(id: string): Promise<Nullable<User>> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = await repository.findOne({ id: new ObjectId(id) })
    return user
  }

  async findByUserName(username: string): Promise<Nullable<User>> {
    const repository = await this.repository()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = await repository.findOne({ username }, { convertCustomTypes: false })
    return user
  }

  async update(user: User, userUpdated: User): Promise<User> {
    const repository = await this.repository()

    const primitives = userUpdated.toPrimitives()

    wrap(user).assign(
      {
        ...primitives,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        _id: primitives.id
      },
      { convertCustomTypes: true }
    )

    await repository.persistAndFlush(user)

    // await repository.nativeUpdate({ id: new ObjectId(user.id.value) }, { $set: userUpdated.toPrimitives() })
    //   const { id, ...data } = userDto.toPrimitives()
    //   const user = await this.user.updateOne({ id }, { $set: data }, { upsert: true })
    //   if (user.modifiedCount) {
    //     const userFromDatabase = await this.user.findOne({ id })
    //     return userFromDatabase
    //       ? User.fromPrimitives({
    //           id: userFromDatabase?.id,
    //           name: userFromDatabase?.name ?? '',
    //           username: userFromDatabase?.username ?? '',
    //           age: userFromDatabase?.age
    //         })
    //       : userDto
    //   }
    return userUpdated
  }

  async delete(id: string): Promise<void> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await repository.nativeDelete({ id: new ObjectId(id) })
  }

  async softDelete(id: string): Promise<void> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await repository.nativeDelete({ id: new ObjectId(id) })
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity
  }
}
