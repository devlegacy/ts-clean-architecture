import { Service } from 'diod'

import { Command, CommandBus } from '../../domain'
import { CommandHandlers } from './CommandHandlers'

// Alternative -> EventEmitter

@Service()
export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    // try {
    await handler.handle(command)
    // } catch (e) {
    //   error(e)
    // }
  }
}
