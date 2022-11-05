import { EntitySchema } from '@mikro-orm/core'

import {
  beforeCreate,
  beforeUpdate,
  onLoad,
  ValueObjectTransformer
} from '@/Contexts/Shared/infrastructure/persistence/mikroorm'
import { UserId } from '@/Contexts/User/Shared/domain'

import { User, UserAge, UserName, UserUsername } from '../../../domain'

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
