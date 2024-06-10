import {
  EntitySchema,
} from '@mikro-orm/core'

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

import {
  Course, CourseDuration, CourseName,
} from '../../../../domain/index.js'

// https://mikro-orm.io/docs/entity-schema#configuration-reference
export const CourseEntity = new EntitySchema<Course>({
  // abstract: true,
  name: 'Course',
  tableName: 'courses',
  class: Course,
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
      type: new ValueObjectTransformer(
        CourseId,
        'ObjectId',
      ),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(CourseId, 'string'),
      // persist: false,
      // serializedPrimaryKey: true,
    },
    name: {
      type: new ValueObjectTransformer(
        CourseName,
        'string',
      ),
    },
    duration: {
      type: new ValueObjectTransformer(
        CourseDuration,
        'string',
      ),
    },
    // createdAt: {
    //   type: 'Date',
    //   nullable: true
    // },
    // updatedAt: {
    //   type: 'Date',
    //   nullable: true
    // },
    // deletedAt: {
    //   type: 'Date',
    //   nullable: true
    // }
  },
}) // .addSerializedPrimaryKey()
