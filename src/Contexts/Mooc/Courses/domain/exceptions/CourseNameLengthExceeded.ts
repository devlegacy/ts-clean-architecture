import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class CourseNameLengthExceeded extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
