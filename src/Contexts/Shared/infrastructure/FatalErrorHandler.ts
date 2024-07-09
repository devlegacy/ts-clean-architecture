import {
  Service,
} from 'diod'

import {
  DomainErrorHandler,
  Logger,
  Monitoring,
} from '../domain/index.js'

// DEBT: Domain (?)
@Service()
export class FatalErrorHandler {
  constructor(
    private readonly logger: Logger,
    private readonly monitoring?: Monitoring,
  ) {}

  capture(err: Error, ..._args: unknown[]): void {
    this?.logger?.error(err)
    this?.monitoring?.capture(err)
    if (DomainErrorHandler?.isDomainError(err)) return

    process.exit(1)
  }
}
