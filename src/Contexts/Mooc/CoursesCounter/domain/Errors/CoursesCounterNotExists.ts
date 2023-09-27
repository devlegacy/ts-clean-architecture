import { EntityNotFoundError } from '@/Contexts/Shared/domain/index.js'

export class CoursesCounterNotExist extends EntityNotFoundError {
  constructor() {
    super('The courses counter does not exists')
  }
}
