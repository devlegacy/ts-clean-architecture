import { EntitySchema } from 'typeorm'

import { CourseDuration, CourseId, CourseName } from '@/Contexts/Mooc/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure'

import { Course } from '../../../domain/Course'

export const CourseEntity = new EntitySchema<Course>({
  name: 'Course',
  tableName: 'courses',
  target: Course,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CourseId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CourseName)
    },
    duration: {
      type: String,
      transformer: ValueObjectTransformer(CourseDuration)
    }
  }
})
