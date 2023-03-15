import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class LotLotLengthExceeded extends InvalidArgumentError {
  constructor(lot: string, limit: number) {
    super(`The lot <${lot}> has more than ${limit} characters.`)
    this.name = this.constructor.name
  }
}
