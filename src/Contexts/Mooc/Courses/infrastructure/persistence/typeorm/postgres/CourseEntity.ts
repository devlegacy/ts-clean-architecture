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
  TypeOrmValueObjectTransformer,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/postgres/TypeOrmValueObjectTransformer.js'

export const CourseEntity = new EntitySchema<Course>({
  name: 'Course',
  tableName: 'courses',
  target: Course,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: TypeOrmValueObjectTransformer(CourseId),
    },
    name: {
      type: String,
      transformer: TypeOrmValueObjectTransformer(CourseName),
    },
    duration: {
      type: String,
      transformer: TypeOrmValueObjectTransformer(CourseDuration),
    },
  },
})
