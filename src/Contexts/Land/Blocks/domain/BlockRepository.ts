import { Block } from './Block'

export abstract class BlockRepository {
  abstract all(): Promise<Block[]>
  abstract find(id: Block['id']): Promise<Nullable<Block>>

  abstract save(block: Block): Promise<void>
  abstract delete(block: Block): Promise<void>
}
