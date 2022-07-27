import { EntitySchema } from 'typeorm'

import { CourseDuration } from '@/contexts/mooc/shared/domain/courses/course-duration'
import { CourseId } from '@/contexts/mooc/shared/domain/courses/course-id'
import { CourseName } from '@/contexts/mooc/shared/domain/courses/course-name'
import { ValueObjectTransformer } from '@/contexts/shared/infrastructure/persistance/typeorm/value-object.transformer'

import { Course } from '../../../domain/course'

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
