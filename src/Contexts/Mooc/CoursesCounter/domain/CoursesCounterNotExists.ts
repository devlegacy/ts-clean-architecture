import { EntityNotFoundException } from '@/Contexts/Shared/domain'

export class CoursesCounterNotExist extends EntityNotFoundException {
  constructor() {
    super('The courses counter does not exists')
  }
}
