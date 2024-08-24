import {
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Lot,
  type LotPrimitiveType,
} from '../../Lots/domain/index.js'
import {
  Block,
  type BlockPrimitiveType,
} from '../domain/index.js'

type ResponseType = (BlockPrimitiveType & { lots?: LotPrimitiveType[] })[]

export class BlocksResponse implements Response {
  readonly blocks: ResponseType

  constructor(blocks: Block[], lots: Lot[] = []) {
    const _lots = lots.reduce(
      (acc: Map<string, LotPrimitiveType[]>, next: Lot) => {
        if (!acc.has(next.blockId.toString())) {
          acc.set(
            next.blockId.toString(),
            [],
          )
        }

        acc.get(next.blockId.toString())?.push({
          ...next.toPrimitives(),
          fullDescription: next.fullDescription,
          shortDescription: next.shortDescription,
        })

        return acc
      },
      new Map<string, LotPrimitiveType[]>(),
    )

    this.blocks = blocks.map((block) => ({
      ...block.toPrimitives(),
      fullDescription: block.fullDescription,
      shortDescription: block.shortDescription,
      lots: _lots.get(block.id.value),
    }))
  }
}
