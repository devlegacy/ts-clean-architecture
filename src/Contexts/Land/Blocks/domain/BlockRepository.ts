import { Nullable } from '@/Contexts/Shared/domain'

import { Block } from './Block'

export interface BlockRepository {
  find(id: Block['id']): Promise<Nullable<Block>>

  save(block: Block): Promise<void>
  delete(block: Block): Promise<void>
}
