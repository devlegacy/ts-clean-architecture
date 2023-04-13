import { Command } from './Command'

export interface ICommandHandler<TCommand extends Command, R = void> {
  // subscribedTo(): Command
  // handle<C extends TCommand>(command: C): Promise<R>
  handle(command: TCommand): Promise<R>
}
