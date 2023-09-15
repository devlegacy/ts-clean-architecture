import { EntityNotFoundError } from '../Errors/index.js'
import { Command } from './Command.js'

export class CommandNotRegisteredError extends EntityNotFoundError {
  constructor(command: Command) {
    super(`The command <${command.constructor.name}> hasn't a command handler associated`)
  }
}
