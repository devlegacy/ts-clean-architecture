import { UseCase } from '@/Contexts/Shared/domain/Common'

import { BlockRepository } from '../../domain'
import { BlocksResponse } from '../BlocksReponse'

@UseCase()
export class BlockSearcher {
  constructor(private readonly repository: BlockRepository) {}

  async run() {
    const blocks = await this.repository.all()
    const response = new BlocksResponse(blocks)

    return response
  }
}
