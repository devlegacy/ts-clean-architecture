import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'

import { Lot, LotEntityDto, LotRepository } from '../../domain'

@injectable()
export class LotCreator {
  constructor(@inject(TYPES.LotRepository) private readonly repository: LotRepository) {}

  async run(request: LotEntityDto) {
    const lot = Lot.create(request)
    // lot.pullDomainEvents()

    await this.repository.save(lot)
  }
}
