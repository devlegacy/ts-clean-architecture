import { EntityNotFoundError } from '@/Contexts/Shared/domain'

export class CoursesCounterNotExist extends EntityNotFoundError {
  constructor() {
    super('The courses counter does not exists')
  }
}
