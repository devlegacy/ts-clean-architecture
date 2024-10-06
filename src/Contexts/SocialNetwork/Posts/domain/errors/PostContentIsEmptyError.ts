import {
  DomainError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostContentIsEmptyError extends DomainError {
  override code = 'PostContentIsEmptyError'

  constructor() {
    super(`The post content can't be empty`)
  }
}
