import { InvalidArgumentException } from '@/Contexts/Shared/domain'

export class CourseNameLengthExceeded extends InvalidArgumentException {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
