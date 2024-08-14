import 'reflect-metadata'

import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import {
  container,
} from '../modules/index.js'
import {
  UserBackendApp,
} from './UserBackendApp.js'

// const { container } = await import('../modules/index.js')
const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  await new UserBackendApp().start()
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
