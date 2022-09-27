import { Course, CourseDuration, CourseName } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

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
