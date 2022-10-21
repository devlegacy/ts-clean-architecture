import { CourseDuration, CourseName } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother'
import { CourseDurationMother, CourseNameMother } from '../domain'

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
