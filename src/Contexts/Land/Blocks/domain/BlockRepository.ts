import { Block } from './Block'

export interface BlockRepository {
  all(): Promise<Block[]>
  find(id: Block['id']): Promise<Nullable<Block>>

  save(block: Block): Promise<void>
  delete(block: Block): Promise<void>
}
