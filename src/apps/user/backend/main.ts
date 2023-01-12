import 'reflect-metadata'

import { container } from 'tsyringe'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

import { UserBackendApp } from './UserBackendApp'

const fatalErrorHandler = container.resolve(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new UserBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
