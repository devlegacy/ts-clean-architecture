import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'

import { UuidMother } from '../../../Shared/domain/uuid.mother'

export class CourseIdMother {
  static create(value: string): CourseId {
    return new CourseId(value)
  }

  static random(): CourseId {
    return this.create(UuidMother.random())
  }
}
