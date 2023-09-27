import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/Persistence/mikroorm/index.js'

import { CoursesCounter, CoursesCounterId, CoursesCounterTotal } from '../../../../domain/index.js'

// https://mikro-orm.io/docs/entity-schema#configuration-reference
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
      customType: new ValueObjectTransformer(CoursesCounterId, 'ObjectId'),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(CoursesCounterId, 'string'),
      // persist: false,
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
