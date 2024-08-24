import {
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Lot,
  type LotPrimitiveType,
} from '../domain/index.js'

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
