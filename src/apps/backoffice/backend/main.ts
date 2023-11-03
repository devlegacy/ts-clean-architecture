import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure/index.js'

import { container } from '../modules/index.js'
import { BackofficeBackendApp } from './BackofficeBackendApp.js'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new BackofficeBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
