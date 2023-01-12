import { inject, injectable } from 'tsyringe'

import { DomainException, Logger, Monitoring } from '../domain'
import { SHARED_TYPES } from './common'

@injectable()
export class FatalErrorHandler {
  constructor(
    @inject(SHARED_TYPES.Logger) private readonly logger: Logger,
    @inject(SHARED_TYPES.Monitoring) private readonly monitoring?: Monitoring
  ) {}

  capture(err: Error, ..._args: unknown[]): void {
    this?.logger?.error(err)
    this?.monitoring?.capture(err)
    if (DomainException?.isKnownException(err)) return

    process.exit(1)
  }
}
