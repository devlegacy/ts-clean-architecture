import { LandDescription, Type } from '@/Contexts/Land/LandDescriptions/domain'

import { Lot, LotRepository } from '../../domain'

export class LotFinder {
  constructor(private readonly repository: LotRepository) {}

  async run(id: Lot['id']) {
    const description = LandDescription.create({
      id: 'd6e97368-0a8e-4a16-84a4-00188138cf98',
      full: 'Lote',
      short: 'Lt.',
      description: 'Describe un lote',
      type: Type.LOT,
    })

    const lot = await this.repository.find(id)
    lot?.setDescription(description)

    return lot
  }
}
