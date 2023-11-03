import { LandDescription, Type } from '@/Contexts/Land/LandDescriptions/domain/index.js'
import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { Block, BlockRepository } from '../../domain/index.js'

@UseCase()
export class BlockFinder {
  constructor(private readonly repository: BlockRepository) {}

  async run(id: Block['id']) {
    const description = LandDescription.create({
      id: 'd6e97368-0a8e-4a16-84a4-00188138cf98',
      full: 'Manzana',
      short: 'Mz.',
      description: 'Describe una manzana o bloque',
      type: Type.BLOCK,
    })

    const block = await this.repository.find(id)
    block?.setDescription(description)

    return block
  }
}
