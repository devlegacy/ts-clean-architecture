import { CourseDuration, CourseName, CoursePrimitiveType } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

import { CourseIdMother } from '../../Shared/domain'
import { CourseDurationMother, CourseNameMother } from '../domain'

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
