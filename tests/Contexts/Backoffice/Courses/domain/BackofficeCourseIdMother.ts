import { BackofficeCourseId } from '@/Contexts/Backoffice/Courses/domain/index.js'
import { ObjectIdMother } from '@/tests/Contexts/Shared/domain/index.js'

export class BackofficeCourseIdMother {
  static create(value: string): BackofficeCourseId {
    return new BackofficeCourseId(value)
  }

  static creator() {
    return () => BackofficeCourseIdMother.random()
  }

  static random(): BackofficeCourseId {
    return this.create(ObjectIdMother.random())
  }
}
