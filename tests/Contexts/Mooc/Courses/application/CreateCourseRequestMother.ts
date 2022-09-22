import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure/dtos/CourseDto'
import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/Courses/CourseDuration'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { CourseName } from '@/Contexts/Mooc/Shared/domain/Courses/CourseName'

import { CourseDurationMother } from '../domain/CourseDurationMother'
import { CourseIdMother } from '../domain/CourseIdMother'
import { CourseNameMother } from '../domain/CourseNameMother'

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
