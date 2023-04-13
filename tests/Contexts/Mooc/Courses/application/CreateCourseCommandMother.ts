import { CourseDuration, CourseName, CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

import { CourseIdMother } from '../../Shared/domain'
import { CourseDurationMother, CourseNameMother } from '../domain'

export class CreateCourseCommandMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): CreateCourseCommand {
    return {
      id: id.value,
      name: name.value,
      duration: duration.value,
    }
  }

  static random(): CreateCourseCommand {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random())
  }

  static invalid(): CreateCourseCommand {
    return {
      id: CourseIdMother.random().value,
      name: CourseNameMother.invalidName(),
      duration: CourseDurationMother.random().value,
    }
  }
}
