import { EnumValueObject, InvalidArgumentException } from '@/Contexts/Shared/domain'

export enum Tag {
  NEW_RELEASE = 'new_release',
  DEPRECATED = 'deprecated'
}

export class CourseTag extends EnumValueObject<Tag> {
  constructor(value: Tag) {
    super(value, Object.values(Tag))
  }

  static fromValue(value: string): CourseTag {
    switch (value) {
      case Tag.NEW_RELEASE:
        return new CourseTag(Tag.NEW_RELEASE)
      case Tag.DEPRECATED:
        return new CourseTag(Tag.DEPRECATED)
      default:
        throw new InvalidArgumentException(`The course tag ${value} is invalid`)
    }
  }

  protected throwInvalidValueException(value: Tag): void {
    throw new InvalidArgumentException(`The course tag ${value} is invalid`)
  }
}
