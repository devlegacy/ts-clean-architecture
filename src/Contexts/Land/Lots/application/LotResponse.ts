import { Response } from '@/Contexts/Shared/domain/index.js'

import { Lot, LotPrimitiveType } from '../domain/index.js'

type ResponseDto = LotPrimitiveType

export class LotResponse implements Response {
  readonly lot: ResponseDto

  constructor(lot: Lot) {
    this.lot = {
      ...lot.toPrimitives(),
      fullDescription: lot.fullDescription,
      shortDescription: lot.shortDescription,
    }
  }
}
