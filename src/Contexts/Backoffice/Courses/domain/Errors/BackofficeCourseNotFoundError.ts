import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class BackofficeCourseNotFoundError extends EntityNotFoundError {
  constructor() {
    super('Course not found')
  }
}
