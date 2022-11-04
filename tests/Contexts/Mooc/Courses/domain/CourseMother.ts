import { Course, CourseDuration, CourseName, CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

import { CourseIdMother } from '../../Shared/domain/Courses'
import { CourseDurationMother } from './CourseDurationMother'
import { CourseNameMother } from './CourseNameMother'

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration?: CourseDuration): Course {
    return new Course(id, name, duration)
  }

  static from(command: CreateCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      command.duration ? CourseDurationMother.create(command.duration) : undefined
    )
  }

  static fromRequest(request: CourseDto): Course {
    return this.create(
      new CourseId(request.id),
      new CourseName(request.name),
      request.duration ? new CourseDuration(request.duration) : undefined
    )
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random())
  }
}
