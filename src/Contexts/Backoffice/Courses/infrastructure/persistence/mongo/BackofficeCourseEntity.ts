import { EntitySchema } from '@mikro-orm/core'

import { beforeCreate, ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import { BackofficeCourse, BackofficeCourseDuration, BackofficeCourseId, BackofficeCourseName } from '../../../domain'

export const BackofficeCourseEntity = new EntitySchema<BackofficeCourse>({
  name: 'BackofficeCourse',
  tableName: 'courses',
  class: BackofficeCourse,
  hooks: {
    beforeCreate: [beforeCreate]
  },
  properties: {
    _id: {
      customType: new ValueObjectTransformer(BackofficeCourseId, 'ObjectId'),
      primary: true
      // hidden: true
    },
    id: {
      type: 'string',
      serializedPrimaryKey: true
    },
    name: {
      customType: new ValueObjectTransformer(BackofficeCourseName, 'string')
    },
    duration: {
      customType: new ValueObjectTransformer(BackofficeCourseDuration, 'string')
    }
  }
})
