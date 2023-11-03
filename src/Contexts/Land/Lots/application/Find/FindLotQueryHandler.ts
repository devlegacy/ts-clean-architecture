import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import { EntityNotFoundError, type QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { LotId } from '../../domain/index.js'
import { LotResponse } from '../LotResponse.js'
import { FindLotQuery } from './FindLotQuery.js'
import { LotFinder } from './LotFinder.js'

@QueryHandlerSubscriber(FindLotQuery)
export class FindLotQueryHandler implements QueryHandler<FindLotQuery, LotResponse> {
  constructor(private readonly finder: LotFinder) {}

  async handle(query: FindLotQuery): Promise<LotResponse> {
    const id = new LotId(query.id)
    const lot = await this.finder.run(id)

    if (!lot) throw new EntityNotFoundError('Lot not found')

    const response = new LotResponse(lot)

    return response
  }
}
