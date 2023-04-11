import { Command } from './Command'

export abstract class CommandBus {
  abstract dispatch(command: Command): Promise<void>
}
