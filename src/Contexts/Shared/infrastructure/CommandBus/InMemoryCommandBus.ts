import { Service } from 'diod'

import { Command, CommandBus } from '../../domain'
import { CommandHandlers } from './CommandHandlers'

// Alternative -> EventEmitter

@Service()
export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly handlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.handlers.get(command)

    // try {
    await handler.handle(command)
    // } catch (e) {
    //   error(e)
    // }
  }
}
