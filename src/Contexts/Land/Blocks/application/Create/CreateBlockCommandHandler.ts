import { BlockId, Boundary } from '@/Contexts/Land/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BlockArea, BlockAvailability, BlockBlock, BlockCreatedAt, BlockStreet, BlockUpdatedAt } from '../../domain'
import { BlockCreator } from './BlockCreator'
import { CreateBlockCommand } from './CreateBlockCommand'

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
