import { Response } from '@/Contexts/Shared/domain/index.js'

import { Block, type BlockPrimitiveType } from '../domain/index.js'

type ResponseType = BlockPrimitiveType

export class BlockResponse implements Response {
  readonly block: ResponseType

  constructor(block: Block) {
    this.block = {
      ...block.toPrimitives(),
      fullDescription: block.fullDescription,
      shortDescription: block.shortDescription,
    }
  }
}
