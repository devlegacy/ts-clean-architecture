import { CommandNotRegisteredException } from './Commands'
import { EntityNotFoundException, InvalidArgumentException } from './exceptions'
import { QueryNotRegisteredException } from './Queries'

export class DomainException {
  static isKnownException(e: unknown) {
    return (
      e instanceof InvalidArgumentException ||
      e instanceof EntityNotFoundException ||
      e instanceof CommandNotRegisteredException ||
      e instanceof QueryNotRegisteredException
    )
  }
}
