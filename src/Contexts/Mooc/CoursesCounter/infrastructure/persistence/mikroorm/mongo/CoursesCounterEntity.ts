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
  MikroOrmValueObjectTransformer,
  onLoad,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/mongo/index.js'

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
    // // @ts-expect-error - _id is not defined in User but in Schema, prevent domain contamination
    // _id: {
    //   // customType: new ValueObjectTransformer(CourseId, 'ObjectId'),
    //   type: new MikroOrmValueObjectTransformer(
    //     CoursesCounterId,
    //     'ObjectId',
    //   ),
    //   // type: 'ObjectId',
    //   primary: true,
    //   // hidden: true,
    // },
    id: {
      // type: 'string',
      // type: new MikroOrmValueObjectTransformer(CoursesCounterId, 'string'),
      // persist: false,
      // serializedPrimaryKey: true,
      type: new MikroOrmValueObjectTransformer(
        CoursesCounterId,
        'ObjectId',
      ),
      primary: true,
      fieldName: '_id',
    },
    total: {
      type: new MikroOrmValueObjectTransformer(
        CoursesCounterTotal,
        'number',
      ),
    },
    existingCourses: {
      type: new MikroOrmValueObjectTransformer(
        CourseId,
        'ObjectId',
      ),
    },
  },
})
