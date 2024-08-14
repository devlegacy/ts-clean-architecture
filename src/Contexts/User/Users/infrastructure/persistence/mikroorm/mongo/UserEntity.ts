import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/mongo/index.js'
import {
  UserId,
} from '#@/src/Contexts/User/Shared/domain/index.js'
import {
  JobExperiences,
  User,
  UserBirthdate,
  UserCreatedAt,
  UserDeletedAt,
  UserEmail,
  UserName,
  UserUpdatedAt,
  UserUsername,
} from '#@/src/Contexts/User/Users/domain/index.js'

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  class: User,
  // https://mikro-orm.io/docs/events
  hooks: {
    onLoad: [
      onLoad,
    ],
    beforeCreate: [
      beforeCreate,
    ],
    beforeUpdate: [
      beforeUpdate,
    ],
    beforeUpsert: [
      beforeUpsert,
    ],
  },
  properties: {
    id: {
      type: new ValueObjectTransformer(
        UserId,
        'ObjectId',
      ),
      primary: true,
      fieldName: '_id',
    },
    name: {
      type: new ValueObjectTransformer(
        UserName,
        'string',
      ),
    },
    username: {
      type: new ValueObjectTransformer(
        UserUsername,
        'string',
      ),
      unique: true,
    },
    email: {
      type: new ValueObjectTransformer(
        UserEmail,
        'string',
      ),
    },
    birthdate: {
      type: new ValueObjectTransformer(
        UserBirthdate,
        'Date',
      ),
    },
    jobExperiences: {
      type: new ValueObjectTransformer(
        JobExperiences,
        '[]',
      ),
    },
    // age: {
    //   type: new ValueObjectTransformer(UserAge, 'number'),
    // },
    createdAt: {
      type: new ValueObjectTransformer(
        UserCreatedAt,
        'date',
      ),
      // onCreate: () => new Date(),
    },
    updatedAt: {
      type: new ValueObjectTransformer(
        UserUpdatedAt,
        'date',
      ),
      // onCreate: () => new Date(),
      // onUpdate: () => new Date(),
    },
    deletedAt: {
      type: new ValueObjectTransformer(
        UserDeletedAt,
        'date',
      ),
      nullable: true,
      default: undefined,
    },
  },
})
