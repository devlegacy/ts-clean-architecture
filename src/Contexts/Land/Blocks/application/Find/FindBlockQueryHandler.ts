import { injectable } from 'tsyringe'

import { EntityNotFoundError, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BlockId } from '../../domain'
import { BlockResponse } from '../BlockResponse'
import { BlockFinder } from './BlockFinder'
import { FindBlockQuery } from './FindBlockQuery'

@injectable()
export class FindBlockQueryHandler implements QueryHandler<FindBlockQuery, BlockResponse> {
  constructor(private readonly finder: BlockFinder) {}

  subscribedTo(): Query {
    return FindBlockQuery
  }

  async handle(query: FindBlockQuery): Promise<BlockResponse> {
    const id = new BlockId(query.id)
    const block = await this.finder.run(id)

    if (!block) throw new EntityNotFoundError('Block not found')

    const response = new BlockResponse(block)

    return response
  }
}
