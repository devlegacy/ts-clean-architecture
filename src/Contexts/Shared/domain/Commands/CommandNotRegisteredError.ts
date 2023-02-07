import { EntityNotFoundError } from '../Errors'
import { Command } from './Command'

export class CommandNotRegisteredError extends EntityNotFoundError {
  constructor(command: Command) {
    super(`The command <${command.constructor.name}> hasn't a command handler associated`)
  }
}
