import { EntitySchema } from '@mikro-orm/core'

import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '../../../../domain'

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
      type: 'ObjectId',
      primary: true,
      hidden: true,
    },
    id: {
      customType: new ValueObjectTransformer(BackofficeCourseId, 'string'),
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
