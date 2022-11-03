import { injectAll, singleton } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'

import { Command, CommandHandler, CommandNotRegisteredException } from '../../domain'

@singleton()
export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(@injectAll(TYPES.CommandHandler) commandHandlers: CommandHandler<Command>[]) {
    super()

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler)
    })
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor)

    if (!commandHandler) {
      throw new CommandNotRegisteredException(command)
    }

    return commandHandler
  }
}
