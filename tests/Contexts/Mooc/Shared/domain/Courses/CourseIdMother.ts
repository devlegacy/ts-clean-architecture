import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  ObjectIdMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class CourseIdMother {
  static create(value: string): CourseId {
    return new CourseId(value)
  }

  static random(): CourseId {
    return CourseIdMother.create(ObjectIdMother.random())
  }
}
