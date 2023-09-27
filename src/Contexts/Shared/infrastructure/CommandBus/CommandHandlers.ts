import {
  Command,
  COMMAND_HANDLER_METADATA,
  type CommandHandler,
  CommandNotRegisteredError,
} from '../../domain/index.js'

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(private readonly handlers: CommandHandler<Command>[]) {
    // constructor() {
    //   const token = SHARED_TYPES.CommandHandler
    //   const commandHandlers = container.isRegistered(token) ? container.resolveAll<CommandHandler<Command>>(token) : []

    super()

    this.handlers.forEach((handler) => {
      const command: Command = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler.constructor)
      this.set(command, handler)
    })
  }

  override get(command: Command): CommandHandler<Command> {
    const handler = super.get(command.constructor)

    if (!handler) throw new CommandNotRegisteredError(command)

    return handler
  }
}
