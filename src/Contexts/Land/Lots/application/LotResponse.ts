import { Response } from '@/Contexts/Shared/domain'

import { Lot, LotPrimitiveDto } from '../domain'

type ResponseDto = LotPrimitiveDto

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
