import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { IdMother } from '@/tests/Contexts/Shared/domain'

export class CourseIdMother {
  static create(value: string): CourseId {
    return new CourseId(value)
  }

  static random(): CourseId {
    return CourseIdMother.create(IdMother.random())
  }
}
