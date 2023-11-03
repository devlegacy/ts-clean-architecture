import { CourseDuration, CourseName, type CoursePrimitiveType } from '@/Contexts/Mooc/Courses/domain/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'

import { CourseIdMother } from '../../Shared/domain/index.js'
import { CourseDurationMother, CourseNameMother } from '../domain/index.js'

export class CreateCourseRequestMother {
  // CreateCourseRequest
  static create(id: CourseId, name: CourseName, duration: CourseDuration): CoursePrimitiveType {
    return {
      id: id.value,
      name: name.value,
      duration: duration.value,
    }
  }

  static random(): CoursePrimitiveType {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random())
  }

  static invalidRequest(): CoursePrimitiveType {
    return {
      id: CourseIdMother.random().value,
      name: CourseNameMother.invalidName(),
      duration: CourseDurationMother.random().value,
    }
  }
}
