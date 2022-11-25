import { EntityNotFoundException } from '../exceptions/EntityNotFoundException'
import { Command } from './Command'

export class CommandNotRegisteredException extends EntityNotFoundException {
  constructor(command: Command) {
    super(`The command <${command.constructor.name}> hasn't a command handler associated`)
  }
}
