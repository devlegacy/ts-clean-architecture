import { EntityNotFoundError, QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { LotId } from '../../domain'
import { LotResponse } from '../LotResponse'
import { FindLotQuery } from './FindLotQuery'
import { LotFinder } from './LotFinder'

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
