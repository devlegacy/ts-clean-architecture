import 'reflect-metadata'

import {
  FatalErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import {
  container,
} from '../modules/index.js'
import {
  UserGraphQLApp,
} from './UserGraphQLApp.js'

// const fatalErrorHandler = container.resolve(FatalErrorHandler)
const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new UserGraphQLApp().start()
    .catch((e) => fatalErrorHandler.capture(e))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
