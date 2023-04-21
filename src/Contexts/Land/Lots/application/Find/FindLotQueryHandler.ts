import { injectable } from 'tsyringe'

import { EntityNotFoundError, IQueryHandler, Query } from '@/Contexts/Shared/domain'

import { LotId } from '../../domain'
import { LotResponse } from '../LotResponse'
import { FindLotQuery } from './FindLotQuery'
import { LotFinder } from './LotFinder'

@injectable()
export class FindLotQueryHandler implements IQueryHandler<FindLotQuery, LotResponse> {
  constructor(private readonly finder: LotFinder) {}

  subscribedTo(): Query {
    return FindLotQuery
  }

  async handle(query: FindLotQuery): Promise<LotResponse> {
    const id = new LotId(query.id)
    const lot = await this.finder.run(id)

    if (!lot) throw new EntityNotFoundError('Lot not found')

    const response = new LotResponse(lot)

    return response
  }
}
