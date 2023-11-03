import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { BlockRepository } from '../../domain/index.js'
import { BlocksResponse } from '../BlocksReponse.js'

@UseCase()
export class BlockSearcher {
  constructor(private readonly repository: BlockRepository) {}

  async run() {
    const blocks = await this.repository.all()
    const response = new BlocksResponse(blocks)

    return response
  }
}
