import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostDoesNotExistError extends EntityNotFoundError {
  override type = 'PostDoesNotExistError'
  constructor(id: string) {
    super(`The post ${id} does not exist`)
  }
}
