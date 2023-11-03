import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '@/Contexts/Backoffice/Courses/domain/index.js'

import { BackofficeCourseDurationMother } from './BackofficeCourseDurationMother.js'
import { BackofficeCourseIdMother } from './BackofficeCourseIdMother.js'
import { BackofficeCourseNameMother } from './BackofficeCourseNameMother.js'

export class BackofficeCourseMother {
  static create(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration: BackofficeCourseDuration
  ): BackofficeCourse {
    return new BackofficeCourse(id, name, duration)
  }

  static withNameAndDuration(name: string, duration: string): BackofficeCourse {
    return this.create(
      BackofficeCourseIdMother.random(),
      BackofficeCourseNameMother.create(name),
      BackofficeCourseDurationMother.create(duration)
    )
  }

  static random(): BackofficeCourse {
    return this.create(
      BackofficeCourseIdMother.random(),
      BackofficeCourseNameMother.random(),
      BackofficeCourseDurationMother.random()
    )
  }
}
