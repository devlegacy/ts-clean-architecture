import { BackofficeCourseName } from '@/Contexts/Backoffice/Courses/domain'
import { WordMother } from '@/tests/Contexts/Shared/domain'

export class BackofficeCourseNameMother {
  static create(value: string): BackofficeCourseName {
    return new BackofficeCourseName(value)
  }

  static random(): BackofficeCourseName {
    return this.create(WordMother.random({ maxLength: 10 }))
  }
}
