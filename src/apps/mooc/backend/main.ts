import 'reflect-metadata'

import process from 'node:process'

import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import {
  container,
} from '../modules/index.js'
import {
  MoocBackendApp,
} from './MoocBackendApp.js'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new MoocBackendApp()
    .start()
    .catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
