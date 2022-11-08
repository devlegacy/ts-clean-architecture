import { injectAll, singleton } from 'tsyringe'

import { Command, CommandHandler, CommandNotRegisteredException } from '../../domain'
import { SHARED_TYPES } from '../common'

@singleton()
export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(@injectAll(SHARED_TYPES.CommandHandler) commandHandlers: CommandHandler<Command>[]) {
    super()

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler)
    })
  }

  get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor)

    if (!commandHandler) {
      throw new CommandNotRegisteredException(command)
    }

    return commandHandler
  }
}
