import {
  BlockId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  QueryHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  EntityNotFoundError,
  type QueryHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BlockResponse,
} from '../BlockResponse.js'
import {
  BlockFinder,
} from './BlockFinder.js'
import {
  FindBlockQuery,
} from './FindBlockQuery.js'

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
