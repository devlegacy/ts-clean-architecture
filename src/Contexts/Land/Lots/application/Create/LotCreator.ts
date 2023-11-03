import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { Lot, LotEntityType, LotRepository } from '../../domain/index.js'

@UseCase()
export class LotCreator {
  constructor(private readonly repository: LotRepository) {}

  async run(request: LotEntityType) {
    const lot = Lot.create(request)
    // lot.pullDomainEvents()

    await this.repository.save(lot)
  }
}
