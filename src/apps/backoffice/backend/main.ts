import 'reflect-metadata'

import process from 'node:process'

import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import {
  container,
} from '../modules/index.js'
import {
  BackofficeBackendApp,
} from './BackofficeBackendApp.js'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  await new BackofficeBackendApp().start()
  // .catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
