import {
  EntitySchema,
} from '@mikro-orm/core'
import {
  ObjectId,
} from 'mongodb'

import {
  MikroOrmMongoRepository,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/index.js'

import {
  User, UserEmail, UserRepository,
} from '../../domain/index.js'
import {
  UserEntity,
} from './mikroorm/mongo/UserEntity.js'

export class MikroOrmMongoUserRepository extends MikroOrmMongoRepository<User> implements UserRepository {
  async searchAll(): Promise<User[]> {
    const repository = await this.repository()

    const users = await repository.findAll({
      orderBy: {
        createdAt: -1,
      },
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
    // begin transaction
    // commit transaction
    // end transaction
    // rollback transaction if error and clean events
    await this.persist(user)
  }

  async searchById(id: User['id']): Promise<Nullable<User>> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = await repository.findOne({
      id: new ObjectId(id.value),
    })
    return user
  }

  async findByUsername(username: User['username']): Promise<Nullable<User>> {
    const repository = await this.repository()
    const user = await repository.findOne(
      {
        username,
      },
      {
        convertCustomTypes: true,
      },
    )
    return user
  }

  async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    const repository = await this.repository()
    const user = await repository.findOne(
      {
        email,
      },
      {
        convertCustomTypes: true,
      },
    )
    return user
  }

  async search(..._data: any): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async update(user: User): Promise<void> {
    // const repository = await this.repository()
    // const primitives = userUpdated.toPrimitives()
    // wrap(user).assign(
    //   {
    //     ...primitives,
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-expect-error
    //     _id: primitives.id,
    //   },
    //   { convertCustomTypes: true }
    // )
    // await repository.persistAndFlush(user)
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
    // await this.persist(user)
    // const client = await this.client()
    // const manager = client.em
    // await manager.flush()
    // return userUpdated

    // console.log(wrap(user).isInitialized())
    // console.log(wrap(user))
    // console.log(wrap(user, true).__em)
    // await wrap(user, true).__em.flush()

    // @ts-expect-error access to private orm property
    if (user?.__helper?.__em?.flush) {
      // @ts-expect-error access to private orm property
      await user.__helper.__em.flush()
    } else {
      await this.persist(user)
    }
  }

  async remove(id: string): Promise<void> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await repository.nativeDelete({
      id: new ObjectId(id),
    })
  }

  async softDelete(id: string): Promise<void> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await repository.nativeDelete({
      id: new ObjectId(id),
    })
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity
  }
}
