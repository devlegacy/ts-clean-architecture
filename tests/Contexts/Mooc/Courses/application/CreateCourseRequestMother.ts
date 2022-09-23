import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CourseDuration, CourseId, CourseName } from '@/Contexts/Mooc/Shared/domain'

import { CourseDurationMother, CourseIdMother, CourseNameMother } from '../domain'

export class CreateCourseRequestMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): CourseDto {
    return {
      id: id.value,
      name: name.value,
      duration: duration.value
    }
  }

  static random(): CourseDto {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random())
  }

  static invalidRequest(): CourseDto {
    return {
      id: CourseIdMother.random().value,
      name: CourseNameMother.invalidName(),
      duration: CourseDurationMother.random().value
    }
  }
}
