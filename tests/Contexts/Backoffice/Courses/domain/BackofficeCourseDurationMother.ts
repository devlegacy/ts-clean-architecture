import { BackofficeCourseDuration } from '@/Contexts/Backoffice/Courses/domain'
import { WordMother } from '@/tests/Contexts/Shared/domain'

export class BackofficeCourseDurationMother {
  static create(value: string): BackofficeCourseDuration {
    return new BackofficeCourseDuration(value)
  }

  static random(): BackofficeCourseDuration {
    return this.create(WordMother.random({ maxLength: 10 }))
  }
}
