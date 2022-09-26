import { EntitySchema, EventArgs } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistance/mongo/ValueObjectTransformer'

import { Course, CourseDuration, CourseName } from '../../../domain'

const beforeCreate = (args: EventArgs<any>) => {
  // TODO: Validate type on value
  // Note: El dominio esta separado de la base de datos :D, eso incluye el como se esta guardo e interpretando el ObjectId
  args.entity._id = args.entity.id
  args.entity._id.value = new ObjectId(args.entity._id.value)

  // console.log(args)
  // console.log(args.entity._id)
}

export const CourseEntity = new EntitySchema<Course>({
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
  }
})
