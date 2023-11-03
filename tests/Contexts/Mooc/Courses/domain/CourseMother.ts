import {
  Course,
  CourseDuration,
  CourseName,
  type CoursePrimitiveType,
  CreateCourseCommand,
} from '@/Contexts/Mooc/Courses/domain/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'

import { CourseIdMother } from '../../Shared/domain/Courses/index.js'
import { CourseDurationMother } from './CourseDurationMother.js'
import { CourseNameMother } from './CourseNameMother.js'

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration?: CourseDuration): Course {
    const course = new Course(id, name, duration)
    return course
  }

  static from(command: CreateCourseCommand): Course {
    const course = CourseMother.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      command.duration ? CourseDurationMother.create(command.duration) : undefined
    )
    return course
  }

  static fromRequest(request: CoursePrimitiveType): Course {
    const course = CourseMother.create(
      new CourseId(request.id),
      new CourseName(request.name),
      request.duration ? new CourseDuration(request.duration) : undefined
    )
    return course
  }

  static random(): Course {
    const course = CourseMother.create(
      CourseIdMother.random(),
      CourseNameMother.random(),
      CourseDurationMother.random()
    )
    return course
  }
}
