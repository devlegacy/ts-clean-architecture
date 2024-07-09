import {
  EntitySchema,
} from 'typeorm'

import {
  Course,
  CourseDuration,
  CourseName,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  ValueObjectTransformer,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/typeorm/ValueObjectTransformer.js'

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
