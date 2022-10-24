import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'

import { Command, CommandBus } from '../../domain'
import { CommandHandlers } from './CommandHandlers'

@injectable()
export class InMemoryCommandBus implements CommandBus {
  constructor(@inject(TYPES.CommandHandler) private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)

    await handler.handle(command)
  }
}
