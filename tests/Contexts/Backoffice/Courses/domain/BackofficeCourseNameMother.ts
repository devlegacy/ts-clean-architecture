import {
  BackofficeCourseName,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  WordMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class BackofficeCourseNameMother {
  static create(value: string): BackofficeCourseName {
    return new BackofficeCourseName(value)
  }

  static random(): BackofficeCourseName {
    return this.create(WordMother.random({
      maxLength: 10,
    }))
  }
}
