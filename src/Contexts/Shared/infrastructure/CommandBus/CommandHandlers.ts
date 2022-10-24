import { Command, CommandHandler, CommandNotRegisteredError } from '../../domain'

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: CommandHandler<Command>[]) {
    super()

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler)
    })
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor)

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command)
    }

    return commandHandler
  }
}
