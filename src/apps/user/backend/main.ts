import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure/index.js'

import { container } from '../modules/index.js'
import { UserBackendApp } from './UserBackendApp.js'

// const { container } = await import('../modules/index.js')
const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new UserBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
