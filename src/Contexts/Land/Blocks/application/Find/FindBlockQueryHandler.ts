import { BlockId } from '@/Contexts/Land/Shared/domain'
import { EntityNotFoundError, QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BlockResponse } from '../BlockResponse'
import { BlockFinder } from './BlockFinder'
import { FindBlockQuery } from './FindBlockQuery'

@QueryHandlerSubscriber(FindBlockQuery)
export class FindBlockQueryHandler implements QueryHandler<FindBlockQuery, BlockResponse> {
  constructor(private readonly finder: BlockFinder) {}

  async handle(query: FindBlockQuery): Promise<BlockResponse> {
    const id = new BlockId(query.id)
    const block = await this.finder.run(id)

    if (!block) throw new EntityNotFoundError('Block not found')

    const response = new BlockResponse(block)

    return response
  }
}
