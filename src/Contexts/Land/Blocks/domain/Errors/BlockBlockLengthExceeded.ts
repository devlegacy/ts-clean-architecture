import { InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

export class BlockBlockLengthExceeded extends InvalidArgumentError {
  constructor(block: string, limit: number) {
    super(`The block <${block}> has more than ${limit} characters.`)
    this.name = this.constructor.name
  }
}
