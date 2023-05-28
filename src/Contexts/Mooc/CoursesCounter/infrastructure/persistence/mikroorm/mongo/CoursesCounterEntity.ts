import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import { CoursesCounter, CoursesCounterTotal } from '../../../../domain'

export const CoursesCounterEntity = new EntitySchema<CoursesCounter>({
  // abstract: true,
  name: 'CoursesCounter',
  tableName: 'courses_counter',
  class: CoursesCounter,
  hooks: {
    onLoad: [onLoad],
    beforeCreate: [beforeCreate],
    beforeUpdate: [beforeUpdate],
    beforeUpsert: [beforeUpsert],
  },
  properties: {
    _id: {
      // customType: new ValueObjectTransformer(CourseId, 'ObjectId'),
      primary: true,
      type: 'ObjectId',
      hidden: true,
    },
    id: {
      customType: new ValueObjectTransformer(CourseId, 'string'),
      serializedPrimaryKey: true,
    },
    total: {
      customType: new ValueObjectTransformer(CoursesCounterTotal, 'number'),
    },
    existingCourses: {
      customType: new ValueObjectTransformer(CourseId, 'ObjectId[]'),
    },
  },
})
