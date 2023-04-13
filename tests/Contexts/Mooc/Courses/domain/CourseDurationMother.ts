import { CourseDuration } from '@/Contexts/Mooc/Courses/domain'
import { WordMother } from '@/tests/Contexts/Shared/domain'

export class CourseDurationMother {
  static create(value: string): CourseDuration {
    return new CourseDuration(value)
  }

  static random(): CourseDuration {
    return CourseDurationMother.create(
      WordMother.random({
        minLength: 1,
        maxLength: 20,
      })
    )
  }
}
