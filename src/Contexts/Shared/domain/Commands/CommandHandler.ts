import { Command } from './Command'

export interface ICommandHandler<T extends Command> {
  // subscribedTo(): Command
  handle(command: T): Promise<void>
}
