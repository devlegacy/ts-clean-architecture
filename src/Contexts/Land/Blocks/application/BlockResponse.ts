import { Response } from '@/Contexts/Shared/domain'

import { Block, BlockPrimitiveDto } from '../domain'

type ResponseDto = BlockPrimitiveDto

export class BlockResponse implements Response {
  readonly block: ResponseDto

  constructor(block: Block) {
    this.block = {
      ...block.toPrimitives(),
      fullDescription: block.fullDescription,
      shortDescription: block.shortDescription,
    }
  }
}
