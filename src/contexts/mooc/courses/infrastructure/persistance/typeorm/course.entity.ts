import { EntitySchema } from 'typeorm'

import { CourseDuration } from '@/contexts/mooc/shared/domain/courses/CourseDuration'
import { CourseId } from '@/contexts/mooc/shared/domain/courses/CourseId'
import { CourseName } from '@/contexts/mooc/shared/domain/courses/CourseName'
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
