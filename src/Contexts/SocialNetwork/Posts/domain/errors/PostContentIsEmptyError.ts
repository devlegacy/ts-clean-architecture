import {
  DomainError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostContentIsEmptyError extends DomainError {
  type = 'PostContentIsEmptyError'

  constructor() {
    super(`The post content can't be empty`)
  }
}
