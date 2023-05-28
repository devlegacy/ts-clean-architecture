import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import { Course, CourseDuration, CourseName } from '../../../../domain'

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
      type: 'ObjectId',
      primary: true,
      hidden: true,
    },
    id: {
      // type: 'string',
      customType: new ValueObjectTransformer(CourseId, 'string'),
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
