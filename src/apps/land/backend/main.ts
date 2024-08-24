import 'reflect-metadata'
import 'module-alias/register'
import 'source-map-support/register'

import dotenv from 'dotenv'
import {
  expand,
} from 'dotenv-expand'

import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import {
  container,
} from '../modules/index.js'
// import { fatalErrorHandler } from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'
import {
  LandBackendApp,
} from './LandBackendApp.js'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  const config = dotenv.config()
  expand(config)

  new LandBackendApp().start()
    .catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
