import { Lot, LotEntityType, LotRepository } from '../../domain'

export class LotCreator {
  constructor(private readonly repository: LotRepository) {}

  async run(request: LotEntityType) {
    const lot = Lot.create(request)
    // lot.pullDomainEvents()

    await this.repository.save(lot)
  }
}
