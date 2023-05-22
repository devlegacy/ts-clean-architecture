import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { BackofficeBackendApp } from './BackofficeBackendApp'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new BackofficeBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
