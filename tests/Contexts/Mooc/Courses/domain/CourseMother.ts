import { Course } from '@/Contexts/Mooc/Courses/domain/Course'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure/dtos/CourseDto'
import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/Courses/CourseDuration'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { CourseName } from '@/Contexts/Mooc/Shared/domain/Courses/CourseName'

import { CourseDurationMother } from './CourseDurationMother'
import { CourseIdMother } from './CourseIdMother'
import { CourseNameMother } from './CourseNameMother'

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration?: CourseDuration): Course {
    return new Course(id, name, duration)
  }

  static fromRequest(request: CourseDto): Course {
    return this.create(
      new CourseId(request.id),
      new CourseName(request.name),
      !request.duration ? undefined : new CourseDuration(request?.duration)
    )
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random())
  }
}
