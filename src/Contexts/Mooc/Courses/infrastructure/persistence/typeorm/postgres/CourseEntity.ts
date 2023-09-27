import { EntitySchema } from 'typeorm'

import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/Persistence/typeorm/ValueObjectTransformer.js'

import { Course, CourseDuration, CourseName } from '../../../../domain/index.js'

export const CourseEntity = new EntitySchema<Course>({
  name: 'Course',
  tableName: 'courses',
  target: Course,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CourseId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CourseName),
    },
    duration: {
      type: String,
      transformer: ValueObjectTransformer(CourseDuration),
    },
  },
})
