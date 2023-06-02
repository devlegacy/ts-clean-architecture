import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '@/Contexts/Backoffice/Courses/domain'

import { BackofficeCourseDurationMother } from './BackofficeCourseDurationMother'
import { BackofficeCourseIdMother } from './BackofficeCourseIdMother'
import { BackofficeCourseNameMother } from './BackofficeCourseNameMother'

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
