import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { beforeCreate, ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import { CoursesCounter, CoursesCounterTotal } from '../../../domain'

export const CoursesCounterEntity = new EntitySchema<CoursesCounter>({
  abstract: true,
  name: 'CoursesCounter',
  tableName: 'courses_counter',
  class: CoursesCounter,
  hooks: {
    beforeCreate: [beforeCreate]
  },
  properties: {
    _id: {
      customType: new ValueObjectTransformer(CourseId, 'ObjectId'),
      primary: true
      // hidden: true
    },
    id: {
      type: 'string',
      serializedPrimaryKey: true
    },
    total: {
      customType: new ValueObjectTransformer(CoursesCounterTotal, 'number')
    },
    existingCourses: {
      customType: new ValueObjectTransformer(CourseId, 'ObjectId[]')
    }
  }
})
