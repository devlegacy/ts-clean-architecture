import { Command, COMMAND_HANDLER_METADATA, CommandNotRegisteredError, ICommandHandler } from '../../domain'

export class CommandHandlers extends Map<Command, ICommandHandler<Command>> {
  constructor(private readonly handlers: ICommandHandler<Command>[]) {
    // constructor() {
    //   const token = SHARED_TYPES.CommandHandler
    //   const commandHandlers = container.isRegistered(token) ? container.resolveAll<CommandHandler<Command>>(token) : []

    super()

    this.handlers.forEach((handler) =>
      this.set(Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler.constructor), handler)
    )
  }

  override get(command: Command): ICommandHandler<Command> {
    const commandHandler = super.get(command.constructor)

    if (!commandHandler) throw new CommandNotRegisteredError(command)

    return commandHandler
  }
}
