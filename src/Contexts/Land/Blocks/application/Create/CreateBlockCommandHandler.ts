import {
  BlockId,
  Boundary,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  CommandHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  CommandHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BlockArea,
  BlockAvailability,
  BlockBlock,
  BlockCreatedAt,
  BlockStreet,
  BlockUpdatedAt,
} from '../../domain/index.js'
import {
  BlockCreator,
} from './BlockCreator.js'
import {
  CreateBlockCommand,
} from './CreateBlockCommand.js'

@CommandHandlerSubscriber(CreateBlockCommand)
export class CreateBlockCommandHandler implements CommandHandler<CreateBlockCommand> {
  constructor(private readonly creator: BlockCreator) {}

  // @AsyncWait()
  async handle(command: CreateBlockCommand): Promise<void> {
    const block = {
      id: new BlockId(command.id),
      block: new BlockBlock(command.block),
      area: new BlockArea(command.area),
      street: new BlockStreet(command.street),
      availability: BlockAvailability.available(),
      northBoundary: new Boundary(command.northBoundary),
      northeastBoundary: new Boundary(command.northeastBoundary),
      eastBoundary: new Boundary(command.eastBoundary),
      southeastBoundary: new Boundary(command.southeastBoundary),
      southBoundary: new Boundary(command.southBoundary),
      southwestBoundary: new Boundary(command.southwestBoundary),
      westBoundary: new Boundary(command.westBoundary),
      northwestBoundary: new Boundary(command.northwestBoundary),
      createdAt: command.createdAt ? new BlockCreatedAt(command.createdAt) : undefined,
      updatedAt: command.updatedAt ? new BlockUpdatedAt(command.updatedAt) : undefined,
    }
    // setTimeout(async () => {
    //   throw new BlockBlockLengthExceeded('Length exceeded')
    await this.creator.run(block)
    // }, 3000)
  }
}
