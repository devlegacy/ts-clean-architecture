import { injectable } from 'tsyringe'

import { BlockId, Boundary } from '@/Contexts/Land/Shared/domain'
import { Command, ICommandHandler } from '@/Contexts/Shared/domain'

import { LotArea, LotAvailability, LotCreatedAt, LotId, LotLot, LotUpdatedAt } from '../../domain'
import { CreateLotCommand } from './CreateLotCommand'
import { LotCreator } from './LotCreator'

@injectable()
export class CreateLotCommandHandler implements ICommandHandler<CreateLotCommand> {
  constructor(private readonly creator: LotCreator) {}

  async handle(command: CreateLotCommand): Promise<void> {
    const lot = {
      id: new LotId(command.id),
      blockId: new BlockId(command.blockId),
      lot: new LotLot(command.lot),
      area: new LotArea(command.area),
      availability: LotAvailability.available(),
      northBoundary: new Boundary(command.northBoundary),
      northeastBoundary: new Boundary(command.northeastBoundary),
      eastBoundary: new Boundary(command.eastBoundary),
      southeastBoundary: new Boundary(command.southeastBoundary),
      southBoundary: new Boundary(command.southBoundary),
      southwestBoundary: new Boundary(command.southwestBoundary),
      westBoundary: new Boundary(command.westBoundary),
      northwestBoundary: new Boundary(command.northwestBoundary),
      createdAt: command.createdAt ? new LotCreatedAt(command.createdAt) : undefined,
      updatedAt: command.updatedAt ? new LotUpdatedAt(command.updatedAt) : undefined,
    }

    await this.creator.run(lot)
  }

  subscribedTo(): Command {
    return CreateLotCommand
  }
}
