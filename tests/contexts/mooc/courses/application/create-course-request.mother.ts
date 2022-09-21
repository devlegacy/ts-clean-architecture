import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure/dtos/course.dto'
import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/courses/CourseDuration'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/courses/CourseId'
import { CourseName } from '@/Contexts/Mooc/Shared/domain/courses/CourseName'

import { CourseDurationMother } from '../domain/course-duration.mother'
import { CourseIdMother } from '../domain/course-id.mother'
import { CourseNameMother } from '../domain/course-name.mother'

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
