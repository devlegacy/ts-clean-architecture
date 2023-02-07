import { injectAll, singleton } from 'tsyringe'

import { Command, CommandHandler, CommandNotRegisteredError } from '../../domain'
import { SHARED_TYPES } from '../common'

@singleton()
export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(@injectAll(SHARED_TYPES.CommandHandler) commandHandlers: CommandHandler<Command>[]) {
    // constructor() {
    //   const token = SHARED_TYPES.CommandHandler
    //   const commandHandlers = container.isRegistered(token) ? container.resolveAll<CommandHandler<Command>>(token) : []

    super()

    commandHandlers.forEach((commandHandler) => this.set(commandHandler.subscribedTo(), commandHandler))
  }

  override get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor)

    if (!commandHandler) throw new CommandNotRegisteredError(command)

    return commandHandler
  }
}
