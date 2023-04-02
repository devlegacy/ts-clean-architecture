import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'

import { BlockRepository } from '../../domain'
import { BlocksResponse } from '../BlocksReponse'

@injectable()
export class BlockSearcher {
  constructor(@inject(TYPES.BlockRepository) private readonly repository: BlockRepository) {}

  async run() {
    const blocks = await this.repository.all()
    const response = new BlocksResponse(blocks)

    return response
  }
}
