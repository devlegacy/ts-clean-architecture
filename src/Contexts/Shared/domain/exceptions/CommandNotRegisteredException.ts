import { Command } from '../Command'
import { EntityNotFoundException } from './EntityNotFoundException'

export class CommandNotRegisteredException extends EntityNotFoundException {
  constructor(command: Command) {
    super(`The command <${command.constructor.name}> hasn't a command handler associated`)
  }
}
