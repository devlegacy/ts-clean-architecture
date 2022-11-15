import { EntitySchema } from '@mikro-orm/core'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { beforeCreate, ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

import { Course, CourseDuration, CourseName } from '../../../domain'

export const CourseEntity = new EntitySchema<Course>({
  // abstract: true,
  name: 'Course',
  tableName: 'courses',
  class: Course,
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
    name: {
      customType: new ValueObjectTransformer(CourseName, 'string')
    },
    duration: {
      customType: new ValueObjectTransformer(CourseDuration, 'string')
    }
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
  }
})
