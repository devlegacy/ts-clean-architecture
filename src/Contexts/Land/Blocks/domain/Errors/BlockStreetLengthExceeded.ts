import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class BlockStreetLengthExceeded extends InvalidArgumentError {
  constructor(street: string, limit: number) {
    super(`The street <${street}> has more than <${limit}> characters.`)
    this.name = this.constructor.name
  }
}
