import { EntitySchema, EventArgs } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mongo/ValueObjectTransformer'

import { CoursesCounter, CoursesCounterTotal } from '../../../domain'

const beforeCreate = (args: EventArgs<any>) => {
  // TODO: Validate type on value
  // Note: El dominio esta separado de la base de datos :D, eso incluye el como se esta guardo e interpretando el ObjectId
  args.entity._id = args.entity.id
  args.entity._id.value = new ObjectId(args.entity._id.value)

  // console.log(args)
  // console.log(args.entity._id)
}

export const CoursesCounterEntity = new EntitySchema<CoursesCounter>({
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
      customType: new ValueObjectTransformer(CoursesCounterTotal, 'string')
    },
    existingCourses: {
      customType: new ValueObjectTransformer(CourseId, 'ObjectId[]')
    }
  }
})
