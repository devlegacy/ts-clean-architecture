import { EntitySchema } from '@mikro-orm/core'

import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/Persistence/mikroorm/index.js'

import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '../../../../domain/index.js'

export const BackofficeCourseEntity = new EntitySchema<BackofficeCourse>({
  name: 'BackofficeCourse',
  tableName: 'courses',
  class: BackofficeCourse,
  hooks: {
    onLoad: [onLoad],
    beforeCreate: [beforeCreate],
    beforeUpdate: [beforeUpdate],
    beforeUpsert: [beforeUpsert],
  },
  properties: {
    _id: {
      customType: new ValueObjectTransformer(BackofficeCourseId, 'ObjectId'),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(BackofficeCourseId, 'string'),
      // persist: false,
      serializedPrimaryKey: true,
    },
    name: {
      customType: new ValueObjectTransformer(BackofficeCourseName, 'string'),
    },
    duration: {
      customType: new ValueObjectTransformer(BackofficeCourseDuration, 'string'),
      nullable: true,
    },
    createdAt: {
      type: 'Date',
      nullable: true,
    },
    updatedAt: {
      type: 'Date',
      nullable: true,
    },
    deletedAt: {
      type: 'Date',
      nullable: true,
    },
  },
})
