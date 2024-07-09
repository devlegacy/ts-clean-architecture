import {
  CourseName,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  WordMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class CourseNameMother {
  static create(value: string): CourseName {
    const name = new CourseName(value)
    return name
  }

  static random(): CourseName {
    const name = CourseNameMother.create(WordMother.random({
      maxLength: 30,
    }))
    return name
  }

  static invalidName(): string {
    return 'a'.repeat(40)
  }
}
