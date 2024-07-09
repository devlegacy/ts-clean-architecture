import {
  CourseDuration,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  WordMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class CourseDurationMother {
  static create(value: string): CourseDuration {
    return new CourseDuration(value)
  }

  static random(): CourseDuration {
    return CourseDurationMother.create(
      WordMother.random({
        minLength: 1,
        maxLength: 20,
      }),
    )
  }
}
