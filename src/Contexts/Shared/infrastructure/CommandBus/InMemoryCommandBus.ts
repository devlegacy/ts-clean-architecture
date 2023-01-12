import { injectable } from 'tsyringe'

import { Command, CommandBus } from '../../domain'
import { error } from '../Logger'
import { CommandHandlers } from './CommandHandlers'

// Alternative -> EventEmitter

@injectable()
export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    try {
      await handler.handle(command)
    } catch (e) {
      error(e)
    }
  }
}
