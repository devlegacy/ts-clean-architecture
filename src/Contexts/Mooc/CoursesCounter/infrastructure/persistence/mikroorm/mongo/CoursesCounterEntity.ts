import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  CoursesCounter,
  CoursesCounterId,
  CoursesCounterTotal,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/mikroorm/index.js'

// https://mikro-orm.io/docs/entity-schema#configuration-reference
export const CoursesCounterEntity = new EntitySchema<CoursesCounter>({
  // abstract: true,
  name: 'CoursesCounter',
  tableName: 'courses_counter',
  class: CoursesCounter,
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
    // @ts-expect-error - _id is not defined in User but in Schema, prevent domain contamination
    _id: {
      // customType: new ValueObjectTransformer(CourseId, 'ObjectId'),
      type: new ValueObjectTransformer(
        CoursesCounterId,
        'ObjectId',
      ),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(CoursesCounterId, 'string'),
      // persist: false,
      // serializedPrimaryKey: true,
    },
    total: {
      type: new ValueObjectTransformer(
        CoursesCounterTotal,
        'number',
      ),
    },
    existingCourses: {
      type: new ValueObjectTransformer(
        CourseId,
        'ObjectId[]',
      ),
    },
  },
})
