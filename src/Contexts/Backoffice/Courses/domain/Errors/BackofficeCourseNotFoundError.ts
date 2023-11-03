import { EntityNotFoundError } from '@/Contexts/Shared/domain/index.js'

export class BackofficeCourseNotFoundError extends EntityNotFoundError {
  constructor() {
    super('Course not found')
  }
}
