import { BackofficeCourseId } from '@/Contexts/Backoffice/Courses/domain'
import { IdMother } from '@/tests/Contexts/Shared/domain'

export class BackofficeCourseIdMother {
  static create(value: string): BackofficeCourseId {
    return new BackofficeCourseId(value)
  }

  static creator() {
    return () => BackofficeCourseIdMother.random()
  }

  static random(): BackofficeCourseId {
    return this.create(IdMother.random())
  }
}
