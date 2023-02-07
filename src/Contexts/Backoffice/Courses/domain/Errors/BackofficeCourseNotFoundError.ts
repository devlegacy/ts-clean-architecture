import { EntityNotFoundError } from '@/Contexts/Shared/domain'

export class BackofficeCourseNotFoundError extends EntityNotFoundError {
  constructor() {
    super('Course not found')
  }
}
