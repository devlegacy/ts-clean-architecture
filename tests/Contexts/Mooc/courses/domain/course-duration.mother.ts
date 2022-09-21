import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/courses/CourseDuration'

import { WordMother } from '../../../shared/domain/word.mother'

export class CourseDurationMother {
  static create(value: string): CourseDuration {
    return new CourseDuration(value)
  }

  static random(): CourseDuration {
    return this.create(
      WordMother.random({
        minLength: 1,
        maxLength: 10
      })
    )
  }
}
