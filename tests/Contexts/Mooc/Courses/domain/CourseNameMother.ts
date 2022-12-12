import { CourseName } from '@/Contexts/Mooc/Courses/domain'
import { WordMother } from '@/tests/Contexts/Shared/domain'

export class CourseNameMother {
  static create(value: string): CourseName {
    return new CourseName(value)
  }

  static random(): CourseName {
    return CourseNameMother.create(WordMother.random({ maxLength: 30 }))
  }

  static invalidName(): string {
    return 'a'.repeat(40)
  }
}
