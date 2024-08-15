import {
  DomainError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostContentTooLongError extends DomainError {
  override type = 'PostContentTooLongError'

  constructor(postContent: string, maxPostContentLength: number) {
    super(`The post content <${postContent}> is longer than ${maxPostContentLength} characters`)
  }
}
