import {
  CourseDuration,
  CourseName,
  CreateCourseCommand,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'

import {
  CourseIdMother,
} from '../../Shared/domain/index.js'
import {
  CourseDurationMother,
  CourseNameMother,
} from '../domain/index.js'

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
