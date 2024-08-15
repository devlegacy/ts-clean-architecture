import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostDoesNotExist extends EntityNotFoundError {
  override type = 'PostDoesNotExist'
  constructor(id: string) {
    super(`The post ${id} does not exist`)
  }
}
