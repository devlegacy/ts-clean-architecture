import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { LandDescription, Type } from '@/Contexts/Land/LandDescriptions/domain'

import { Block, BlockRepository } from '../../domain'

@injectable()
export class BlockFinder {
  constructor(@inject(TYPES.BlockRepository) private readonly repository: BlockRepository) {}

  async run(id: Block['id']) {
    const description = LandDescription.create({
      id: 'd6e97368-0a8e-4a16-84a4-00188138cf98',
      long: 'Manzana',
      short: 'Mz.',
      description: 'Describe una manzana o bloque',
      type: Type.BLOCK,
    })

    const block = await this.repository.find(id)
    block?.setDescription(description)

    return block
  }
}
