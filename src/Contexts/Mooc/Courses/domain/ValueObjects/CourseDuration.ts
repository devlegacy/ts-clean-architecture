import {
  StringValueObject,
  // ValueObject
} from '@/Contexts/Shared/domain'

export class CourseDuration extends StringValueObject {
  static create(value?: string) {
    if (!value) return undefined

    return new CourseDuration(value)
  }
}
