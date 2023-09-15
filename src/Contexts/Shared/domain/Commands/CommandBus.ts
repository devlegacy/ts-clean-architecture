import { Command } from './Command.js'

export abstract class CommandBus {
  abstract dispatch(command: Command): Promise<void>
}
