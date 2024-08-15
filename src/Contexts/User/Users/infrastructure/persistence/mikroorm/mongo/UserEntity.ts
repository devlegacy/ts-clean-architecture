import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  MikroOrmValueObjectTransformer,
  onLoad,
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
      type: new MikroOrmValueObjectTransformer(
        UserId,
        'ObjectId',
      ),
      primary: true,
      fieldName: '_id',
    },
    name: {
      type: new MikroOrmValueObjectTransformer(
        UserName,
        'string',
      ),
    },
    username: {
      type: new MikroOrmValueObjectTransformer(
        UserUsername,
        'string',
      ),
      unique: true,
    },
    email: {
      type: new MikroOrmValueObjectTransformer(
        UserEmail,
        'string',
      ),
    },
    birthdate: {
      type: new MikroOrmValueObjectTransformer(
        UserBirthdate,
        'Date',
      ),
    },
    jobExperiences: {
      type: new MikroOrmValueObjectTransformer(
        JobExperiences,
        '[]',
      ),
    },
    // age: {
    //   type: new ValueObjectTransformer(UserAge, 'number'),
    // },
    createdAt: {
      type: new MikroOrmValueObjectTransformer(
        UserCreatedAt,
        'date',
      ),
      // onCreate: () => new Date(),
    },
    updatedAt: {
      type: new MikroOrmValueObjectTransformer(
        UserUpdatedAt,
        'date',
      ),
      // onCreate: () => new Date(),
      // onUpdate: () => new Date(),
    },
    deletedAt: {
      type: new MikroOrmValueObjectTransformer(
        UserDeletedAt,
        'date',
      ),
      nullable: true,
      default: undefined,
    },
  },
})
