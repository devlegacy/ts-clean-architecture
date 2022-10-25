/* eslint-disable no-console */
import { EntitySchema, EventArgs } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mongo/ValueObjectTransformer'
import { UserId } from '@/Contexts/User/Shared/domain'

import { User, UserAge, UserName, UserUsername } from '../../../domain'

const beforeCreate = (args: EventArgs<any>) => {
  // TODO: Validate type on value
  // NOTE: El dominio esta separado de la base de datos :D, eso incluye el como se esta guardo e interpretando el ObjectId
  args.entity._id = args.entity.id
  args.entity._id.value = new ObjectId(args.entity._id.value)

  // console.log(args)
  // console.log(args.entity._id)
}

const onLoad = (args: EventArgs<any>) => {
  // console.log(args)
  // console.log(args.entity._id)

  args.entity._id.value = args.entity._id.value.toString()
}

const beforeUpdate = (args: EventArgs<any>) => {
  console.log(args)
  console.log(args.entity._id)

  args.entity._id = args.entity.id
  args.entity._id.value = new ObjectId(args.entity._id.value)
  args.entity.id.value = args.entity._id.value

  console.log(args)
}

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  class: User,
  // https://mikro-orm.io/docs/events
  hooks: {
    onLoad: [onLoad],
    beforeCreate: [beforeCreate],
    beforeUpdate: [beforeUpdate]
  },
  properties: {
    _id: {
      customType: new ValueObjectTransformer(UserId, 'ObjectId'),
      primary: true
      // hidden: true
    },
    id: {
      type: 'string',
      serializedPrimaryKey: true
    },
    name: {
      customType: new ValueObjectTransformer(UserName, 'string')
    },
    username: {
      customType: new ValueObjectTransformer(UserUsername, 'string'),
      unique: true
    },
    age: {
      customType: new ValueObjectTransformer(UserAge, 'number')
    }
  }
})
