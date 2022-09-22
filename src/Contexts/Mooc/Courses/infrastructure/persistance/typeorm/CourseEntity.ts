import { EntitySchema } from 'typeorm'

import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/Courses/CourseDuration'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { CourseName } from '@/Contexts/Mooc/Shared/domain/Courses/CourseName'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistance/typeorm/ValueObjectTransformer'

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
