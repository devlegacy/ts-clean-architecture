import { Response } from '@/Contexts/Shared/domain'

import { Block, BlockPrimitiveType } from '../domain'

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
