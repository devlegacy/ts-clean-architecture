import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/Persistence/mikroorm'

import { Course, CourseDuration, CourseName } from '../../../../domain'

// https://mikro-orm.io/docs/entity-schema#configuration-reference
export const CourseEntity = new EntitySchema<Course>({
  // abstract: true,
  name: 'Course',
  tableName: 'courses',
  class: Course,
  hooks: {
    onLoad: [onLoad],
    beforeCreate: [beforeCreate],
    beforeUpdate: [beforeUpdate],
    beforeUpsert: [beforeUpsert],
  },
  properties: {
    _id: {
      customType: new ValueObjectTransformer(CourseId, 'ObjectId'),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(CourseId, 'string'),
      // persist: false,
      serializedPrimaryKey: true,
    },
    name: {
      customType: new ValueObjectTransformer(CourseName, 'string'),
    },
    duration: {
      customType: new ValueObjectTransformer(CourseDuration, 'string'),
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
}) //.addSerializedPrimaryKey()
