import { CourseId } from '@/Contexts/Mooc/Shared/domain/courses/CourseId'

import { UuidMother } from '../../../shared/domain/uuid.mother'

export class CourseIdMother {
  static create(value: string): CourseId {
    return new CourseId(value)
  }

  static random(): CourseId {
    return this.create(UuidMother.random())
  }
}
